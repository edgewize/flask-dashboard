import pandas as pd
import hydrofunctions
import datetime
from dateutil.relativedelta import relativedelta
import os
import templates.utils as utils


def passHydroArgs(site_id, start_date=None, end_date=None, period=None):
    if start_date and end_date:
        hf = hydrofunctions.NWIS(
            site_id, 'dv', start_date=start_date, end_date=end_date)
    elif start_date:
        hf = hydrofunctions.NWIS(
            site_id, 'dv', start_date=start_date)
    else:
        hf = hydrofunctions.NWIS(
            site_id, 'dv', period=period)
    return hf


def getSiteData(site_id=None):
    config = utils.getConfig()
    data_list = config['wave_sites']
    if site_id:
        return [i for i in data_list if i['site_id'] == int(site_id)][0]
    else:
        return data_list


def formatHydroDf(df, name):
    # name = str(new_col_name)
    try:
        cols = df.columns
    except AttributeError:
        return None
    data_col = cols[0]  # it's always first
    qualifyer_col = cols[1]  # always second
    df = df.rename(columns={data_col: name}).drop(qualifyer_col, 1)
    return df


def lookupTimeFrequency(date, time_frequency):
    time_frequency = time_frequency.lower()
    if time_frequency == 'w':
        return date.week
    elif time_frequency == 'm':
        return date.month
    elif time_frequency == 'y':
        return date.year
    else:
        return date.dayofyear


class Dashboard(object):
    def __init__(self, site_id, hydro_args):
        """
        hydro_args = {
            'start_date': 'yyyy-mm-dd' | None,
            'end_date': 'yyyy-mm-dd' | None,
            'period': 'P7D' # Hyrdrofunctions date string 
        }
        """
        target_fields = utils.HYDROFUNCTION_ARGS
        for i in target_fields:
            try:
                hydro_args[i]
            except KeyError:
                hydro_args[i] = None
        self.site_id = site_id
        self.site_info = getSiteData(site_id=self.site_id)
        self.period = hydro_args['period']
        self.start_date = hydro_args['start_date']
        self.end_date = hydro_args['end_date']
        self.hf = passHydroArgs(site_id,
                                start_date=self.start_date,
                                end_date=self.end_date,
                                period=self.period)
        self.today = datetime.datetime.today().date()
        try:
            self.data = formatHydroDf(self.hf.get_data().df(), self.today.year)
        except hydrofunctions.exceptions.HydroNoDataError:
            self.data = None
        if self.start_date is None:
            if self.data is not None:
                self.start_date = str(self.data.index.min().date())
            else:
                self.start_date = None
        if self.end_date is None:
            self.end_date = str(self.today)

    def getMostRecentCfs(self):
        df = self.data
        most_recent_record = df.loc[df.index.max()]
        # CFS col names are variable but they are always first
        most_recent_cfs = most_recent_record[df.columns[0]]
        return most_recent_cfs

    def siteInfo(self):
        start_date = self.start_date
        if start_date is None and self.data is not None:
            start_date = str(self.data.index.min().date())
        data = {
            'site_id': self.site_id,
            'site_name': self.hf.siteName,
            'start_date': start_date,
            'end_date': self.end_date,
            'session': self.site_info['session']
        }
        if self.data is not None:
            most_recent = self.getMostRecentCfs()
            data['most_recent_cfs'] = most_recent
            info = [i for i in utils.getConfig()['wave_sites']
                    if int(i['site_id']) == int(self.site_id)]
            if len(info) > 0:
                info = info[0]
                now_above_min = int(most_recent) > int(info['session']['low'])
                in_session = True if now_above_min else False
                data['status'] = in_session
        return data

    def frequencyByYear(self, time_frequency='M'):
        time_means = self.data.groupby(pd.Grouper(freq=time_frequency)).mean()
        index_group = {
            'M': time_means.index.month,
            'D': time_means.index.dayofyear,
            'W': time_means.index.week
        }[time_frequency]
        avg_by_year = time_means.groupby([index_group, time_means.index.year]).mean()[
            time_means.columns[0]].unstack()
        return avg_by_year

    def yoyComparison(self, target_year):
        years_in_past = self.today.year - target_year
        dates = [self.start_date, self.end_date]  # order matters here
        format_dates = [pd.to_datetime(i) for i in dates]
        past_dates = [i - relativedelta(years=years_in_past)
                      for i in format_dates]
        format_past_dates = [str(i.date()) for i in past_dates]
        start = format_past_dates[0]
        end = format_past_dates[1]
        df = passHydroArgs(
            self.site_id, start_date=start, end_date=end).get_data().df()
        format_df = formatHydroDf(df, target_year)
        return format_df

    def multiYearComparison(self, years, time_frequency='M'):
        df = self.data
        new_dfs = [self.yoyComparison(i) for i in years]
        df = df.join(new_dfs, how='outer')
        df = df.groupby(pd.Grouper(freq=time_frequency)).mean()
        df['cfs'] = df.sum(axis=1)  # daily cfs for entire period
        df['index'] = df.index  # copy index so we can apply easier
        df[time_frequency] = df['index'].apply(
            lambda x: lookupTimeFrequency(x, time_frequency))
        agg_df = df.groupby(time_frequency).sum().drop('cfs', 1)
        agg_df = agg_df[agg_df > 0].dropna()
        new_index = df.groupby(pd.Grouper(freq=time_frequency)).sum()[
            self.today.year]
        new_index = new_index[new_index > 0].index
        agg_df['new_index'] = new_index
        agg_df = agg_df.set_index('new_index')
        return agg_df

    def avgComparison(self, years, time_frequency='M'):
        year_comparison = self.multiYearComparison(
            years, time_frequency=time_frequency)
        # exclude current year because we comapre now to other year average
        current_year = pd.to_datetime(self.end_date).year
        current_year_df = year_comparison[current_year].to_frame()
        year_count = len(years)
        if year_count == 1:
            col_name = 'Last year'
        else:
            col_name = f'{year_count} year AVG'
        current_year_df[col_name] = year_comparison.drop(
            current_year, 1).mean(axis=1)
        return current_year_df

    def getYearlyStats(self, yearly_avgs):
        stats = yearly_avgs.describe().fillna('NaN')
        result = []
        for i in stats.columns:
            s = stats[i].to_dict()
            s['year'] = i
            result.append(s)
        return result

    def addSessionInfo(self, df):
        # adds session min to df in case we want it on a graph
        df['session_min'] = self.site_info['session']['low']
        return df

    def countAboveMin(self, df):
        question_field_name = 'is_above_min'
        df[question_field_name] = self.data[self.today.year].apply(
            lambda x: True if x > self.site_info['session']['low'] else False)
        above_min_counts = df.groupby(question_field_name).count()
        return above_min_counts


if __name__ == "__main__":
    site_id = '13206000'
    args = {
        'start_date': None,
        'end_date': None,
        'period': 'P30D'
    }
    d = Dashboard(site_id, args)
    above_min_counts = d.countAboveMin(d.data)
    t = utils.donutChart(above_min_counts)
    print(t)
