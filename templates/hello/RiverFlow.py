import hydrofunctions as hf


class Dashboard(object):
    def __init__(self, siteId, period='P99D'):
        self.siteId = siteId
        self.period = period
        self.data = hf.NWIS(siteId, 'dv', period='P99D').get_data().df()

    def chartData(self):
        df = self.data
        labels = [str(i).split('T')[0] for i in df.index.values]
        data = list(df[df.columns[0]].values)
        return {
            'labels': labels,
            'data': data
        }


if __name__ == "__main__":
    boiseRiver = '13206000'
    d = Dashboard(boiseRiver)
    print(d.chartData())
