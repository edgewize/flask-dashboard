import pandas as pd
import hydrofunctions
import datetime
import templates.hello.utils as utils


class Dashboard(object):
    def __init__(self, siteId, period='P99D', start_date=None, end_date=None):
        self.siteId = siteId
        self.period = period
        self.start_date = start_date
        self.end_date = end_date
        if self.end_date is None:
            self.end_date = str(datetime.datetime.today().date())
        if start_date and end_date:
            hf = hydrofunctions.NWIS(
                siteId, 'dv', start_date=start_date, end_date=end_date)
        elif start_date:
            hf = hydrofunctions.NWIS(
                siteId, 'dv', start_date=start_date)
        else:
            hf = hydrofunctions.NWIS(
                siteId, 'dv', period=period)
        self.hf = hf
        try:
            self.data = hf.get_data().df()
        except hydrofunctions.exceptions.HydroNoDataError:
            self.data = None

    def site_info(self):
        start_date = self.start_date
        if start_date is None and self.data is not None:
            start_date = str(self.data.index.min().date())
        data = {
            'site_id': self.siteId,
            'site_name': self.hf.siteName,
            'start_date': start_date,
            'end_date': self.end_date,
        }
        if self.data is not None:
            most_recent = self.getMostRecentCfs()
            data['most_recent_cfs'] = most_recent
            info = [i for i in utils.getConfig()['wave_sites']
                    if i['site_id'] == self.siteId]
            if len(info) > 0:
                info = info[0]
                now_above_min = int(most_recent) > int(info['session']['low'])
                in_session = True if now_above_min else False
                data['status'] = in_session
        return data

    def frequency_by_year(self, freq='M'):
        time_means = self.data.groupby(pd.Grouper(freq=freq)).mean()
        index_group = {
            'M': time_means.index.month,
            'D': time_means.index.dayofyear,
            'W': time_means.index.week
        }[freq]
        avg_by_year = time_means.groupby([index_group, time_means.index.year]).mean()[
            time_means.columns[0]].unstack()
        return avg_by_year

    def line_chart(self, df):
        # df = df.fillna(0)
        # Formats dataframe for consumption by ChartJs on front end
        labels = [str(i).split('T')[0] for i in df.index.values]
        datasets = []
        colors = ['red', 'green', 'blue', 'orange', 'purple',
                  'yellow', 'gray', 'pink', 'cyan', 'magenta']
        for i in range(0, len(df.columns)):
            label = df.columns[i]
            color = colors[i]
            data = list(df[df.columns[i]].values)
            dset = {
                'label': str(label),
                'backgroundColor': 'transparent',
                'borderColor': color,
                'data': [str(i) for i in data]
            }
            datasets.append(dset)
        return {
            'labels': labels,
            'datasets': datasets
        }

    def getYearlyStats(self, yearly_avgs):
        stats = yearly_avgs.describe().fillna('NaN')
        result = []
        for i in stats.columns:
            s = stats[i].to_dict()
            s['year'] = i
            result.append(s)
        return result

    def getMostRecentCfs(self):
        df = self.data
        most_recent_record = df.loc[df.index.max()]
        # CFS col names are variable but they are always first
        most_recent_cfs = most_recent_record[df.columns[0]]
        return most_recent_cfs

    def build(self, freq=None):
        if freq is None and self.period is not None:
            # gets lst letter from hydrofunction periods like P7D
            freq = self.period[-1:]
        site_info = self.site_info()
        data = {'info': site_info}
        if self.data is not None:
            yearly_avgs = self.frequency_by_year(freq=freq)
            timeline_data = self.line_chart(yearly_avgs)
            yearly_stats = self.getYearlyStats(yearly_avgs)
            data['stats'] = {'yearly': yearly_stats}
            data['charts'] = {'timeline': timeline_data}
        return data


def getSiteData():
    config = utils.getConfig()
    data_list = config['wave_sites']
    return data_list


if __name__ == "__main__":
    boiseRiver = '13206000'
    hf = Dashboard(boiseRiver, start_date='2017-01-01')
    agg = hf.frequency_by_year()
    chart = hf.line_chart(agg)
    print(chart)
