import os
import json

ROOT_DIR = os.getcwd()[:os.getcwd().find(
    'filmnetworks')+len('filmnetworks')]

PROJECT_FILES = ['film', 'cast', 'filmCast']


def saveJsonData(jsonData, fileName):
    path = f'{ROOT_DIR}\\build\\data\\{fileName}.json'
    with open(path, 'w') as outfile:
            json.dump(jsonData, outfile)
    return (f'saved to  {path}')