import os
import json

PROJECT_NAME = 'flask-dashboard'

ROOT_DIR = os.getcwd()[:os.getcwd().find(
    PROJECT_NAME)+len(PROJECT_NAME)]


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