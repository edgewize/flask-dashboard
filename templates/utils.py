import os
import json

PROJECT_NAME = 'flask-dashboard'


ROOT_DIR = os.getcwd()[:os.getcwd().find(
    PROJECT_NAME)+len(PROJECT_NAME)]


HYDROFUNCTION_ARGS = ['period', 'freq']


def getConfig():
    path = ROOT_DIR + '/config.json'
    with open(path) as json_file:
        config = json.load(json_file)
    return config


def lineChart(df):
    # df = df.fillna(0)
    # Formats dataframe for consumption by ChartJs on front end
    labels = [str(i).split('T')[0] for i in df.index.values]
    datasets = []
    colors = ['#36A2EB', '#d0d0d0', '#FF6384', '#FFCE56', 'blue', 'orange', 'purple',
              'yellow', 'gray', 'pink', 'cyan', 'magenta']
    for i in range(0, len(df.columns)):
        label = df.columns[i]
        color = colors[i]
        data = [int(i) for i in df[df.columns[i]]]
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


def donutChart(df):
    labels = list(df.index)
    datasets = []
    for col in df.columns:
        data = [int(i) for i in df[col].values]
        # data = list(df[col].values)
        colors = ['#36A2EB', '#d0d0d0']
        hoverColors = ['#36A2EB', '#d0d0d0']
        dataset = {
            'data': data,
            'backgroundColor': colors,
            'hoverBackgroungColor': hoverColors
        }
        datasets.append(dataset)
    donut = {
        'labels': labels,
        'datasets': datasets
    }
    return donut


def saveJson(data, path):
    with open(path, 'w') as outfile:
        json.dump(data, outfile)
    return f'Saved {path}'