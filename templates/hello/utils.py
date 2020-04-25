import os
import json

PROJECT_NAME = 'flask-dashboard'


ROOT_DIR = os.getcwd()[:os.getcwd().find(
    PROJECT_NAME)+len(PROJECT_NAME)]


HYDROFUNCTION_ARGS = ['start_date', 'end_date', 'period'] 

def getConfig():
    path = ROOT_DIR + '/config.json'
    with open(path) as json_file:
        config = json.load(json_file)
    return config
# PROJECT_FILES = ['film', 'cast', 'filmCast']

# def saveJsonData(jsonData, fileName):
#     path = f'{ROOT_DIR}\\build\\data\\{fileName}.json'
#     with open(path, 'w') as outfile:
#             json.dump(jsonData, outfile)
#     return (f'saved to  {path}')


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
