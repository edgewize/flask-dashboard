import os
import json

PROJECT_NAME = 'flask-dashboard'

ROOT_DIR = os.getcwd()[:os.getcwd().find(
    PROJECT_NAME)+len(PROJECT_NAME)]

# PROJECT_FILES = ['film', 'cast', 'filmCast']

# def saveJsonData(jsonData, fileName):
#     path = f'{ROOT_DIR}\\build\\data\\{fileName}.json'
#     with open(path, 'w') as outfile:
#             json.dump(jsonData, outfile)
#     return (f'saved to  {path}')