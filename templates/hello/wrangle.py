import os
import json
import pandas as pd
import templates.hello.utils as utils
# import utils

def loadCreditData():
    filmRecords = []
    castRecords = []
    filmCastRecords = []
    creditData = pd.read_csv(
        utils.ROOT_DIR + '\\templates\\hello\\data\\tmdb_5000_credits.csv')
    for filmCast in creditData.values:
        filmId = filmCast[0]
        filmRecords.append({'filmId': filmId,
            'name': filmCast[1]})
        castList = json.loads(filmCast[2])
        for cast in castList:
            castId = cast['id']
            castRecords.append({'castId': castId,
                                'name': cast['name']})
            filmCastRecords.append({'filmCastId': int(str(filmId) + str(castId)),
                                    'filmId': filmId, 
                                    'castId': castId})

    data = {
        'film': list({v['filmId']:v for v in filmRecords}.values()),
        'cast': list({v['castId']:v for v in castRecords}.values())[:25],
        'filmCast': filmCastRecords
    }

    for f in data.keys():
        path = f'{utils.ROOT_DIR}\\templates\\public\\data\\{f}.json'
        with open(path, 'w') as outfile:
            json.dump(data[f], outfile)

    return True


def checkFiles():
    checkGood = True
    for f in utils.PROJECT_FILES:
        path = f'{utils.ROOT_DIR}\\templates\\public\\data\\{f}.json'
        fileCheck = os.path.exists(path)
        if fileCheck is False:
            checkGood = False
    return checkGood


class FilmNetworks(object):
    """
      Gets data fro the API
    """

    def __init__(self):
        self.data = {}
        for f in utils.PROJECT_FILES:
            path = f'{utils.ROOT_DIR}\\templates\\public\\data\\{f}.json'
            with open(path) as json_file:
                self.data[f] = json.load(json_file)


    def getLegitType(self, searchType):
        if searchType in utils.PROJECT_FILES:
            return searchType
        else:
            return utils.PROJECT_FILES[0]

    def filterData(self, data, filterParam, search):
        return list(filter(
            lambda record: record[filterParam] == search, data))

    def getRecordbyId(self, searchType, searchId):
        searchType = self.getLegitType(searchType)
        record = self.filterData(self.data[searchType], f'{searchType}Id', int(searchId))
        try:
            return record[0]
        except IndexError:
            print(record)

    def getRelations(self, searchType, searchId):
        records = self.filterData(self.data['filmCast'], f'{searchType}Id', int(searchId))
        castIds = set([i['castId'] for i in records])
        filmIds = set([i['filmId'] for i in records])
        return {
            'records': records,
            'castIds': castIds,
            'filmIds': filmIds
        }

    def getProfile(self, searchType, searchId):
        profileRecord = self.getRecordbyId(searchType, searchId)
        relationRecords = self.getRelations(searchType, searchId)
        otherType = 'film'
        if searchType == otherType:
            otherType == 'cast'
        otherRecords = [self.getRecordbyId(otherType, sId) for sId in relationRecords[f'{otherType}Ids']] 
        return {
            searchType: profileRecord,
            'filmCast': relationRecords['records'],
            otherType: otherRecords
        }

if __name__ == "__main__": 
    fn = FilmNetworks()
    # castId = fn.data['cast'][10]['castId']
    castId = 1180936
    profile = fn.getProfile('cast', castId)
    print(profile)
    