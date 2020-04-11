import pandas as pd
import hydrofunctions
import datetime


class Dashboard(object):
    def __init__(self, siteId, period='P99D', start_date=None, end_date=None):
        self.siteId = siteId
        self.period = period
        self.start_date = start_date
        self.end_date = end_date
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
        self.data = hf.get_data().df()

    def site_info(self):
        data = {
            'site_id': self.siteId,
            'site_name': self.hf.siteName,
            'start_date': self.start_date,
            'end_date': self.end_date
        }
        return data

    def frequency_by_year(self, freq='M'):
        time_means = self.data.groupby(pd.Grouper(freq=freq)).mean()
        index_group = {
            'M': time_means.index.month,
            'D': time_means.index.date,
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
        stats = yearly_avgs.describe()
        result = []
        for i in stats.columns:
            s = stats[i].to_dict()
            s['year'] = i
            result.append(s)
        return result

    def build(self, freq='M'):
        yearly_avgs = self.frequency_by_year(freq=freq)
        timeline_data = self.line_chart(yearly_avgs)
        yearly_stats = self.getYearlyStats(yearly_avgs)
        site_info = self.site_info()
        data = {
            'info': site_info,
            'stats': {
                'yearly': yearly_stats
            },
            'charts': {
                'timeline': timeline_data
            }
        }
        return data


if __name__ == "__main__":
    boiseRiver = '13206000'
    hf = Dashboard(boiseRiver, start_date='2017-01-01')
    agg = hf.frequency_by_year()
    chart = hf.line_chart(agg)
    print(chart)