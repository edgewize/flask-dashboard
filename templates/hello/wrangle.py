import os
import json
import pandas as pd
import templates.hello.utils as utils
# import utils


def checkFiles():
    checkGood = True
    for f in utils.PROJECT_FILES:
        path = f'{utils.ROOT_DIR}\\build\\data\\{f}.json'
        fileCheck = os.path.exists(path)
        if fileCheck is False:
            checkGood = False
    return checkGood


class FilmNetworks(object):
    """
    Main class for connecting data with front ent
    """

    def __init__(self):
        self.data = {}
        for f in utils.PROJECT_FILES:
            path = f'{utils.ROOT_DIR}\\build\\data\\{f}.json'
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
        # try:
        # if filterParam == 'filmId':
        #     filterParam = 'id'
        #     return list(filter(
        #         lambda record: record[filterParam] == search, data))
        # except TypeError:
        #     pdb.set_trace()

    def getRecordbyId(self, searchType, searchId):
        searchType = self.getLegitType(searchType)
        record = self.filterData(
            self.data[searchType], f'{searchType}Id', int(searchId))
        # if searchType == 'film':
        #     record = record
        try:
            return record[0]
        except IndexError:
            print(record)

    def getRelations(self, searchType, searchId):
        records = self.filterData(
            self.data['filmCast'], f'{searchType}Id', int(searchId))
        castIds = set([i['castId'] for i in records])
        filmIds = set([i['filmId'] for i in records])
        return {
            'records': records,
            'castIds': castIds,
            'filmIds': filmIds
        }

        # Make Cytoscape data
        # profileNodes = [{'data': {
        #     'id': profileRecord[f'{searchType}Id'],
        #     'label': profileRecord['name']}
        # }]

        # otherNodes = [{'data': {
        #     'id': i[f'{otherType}Id'],
        #     'label': i['name']}
        # } for i in otherRecords]

        # edges = [{'data': {
        #     'filmCastId': i['filmCastId'],
        #     'source': i[f'{searchType}Id'],
        #     'target': i[f'{otherType}Id']}
        #     } for i in relationRecords['records']]

        # elements = profileNodes + otherNodes + edges

    def filmStats(self, films):
        # totalBudget = sum([film['budget'] for film in films])
        # totalRevenue = sum([film['revenue'] for film in films])
        totalBudget = 45
        totalRevenue = 11
        return {
            'budget': totalBudget,
            'revenue': totalRevenue
        }

    def getProfile(self, searchType, searchId):
        profileRecord = self.getRecordbyId(searchType, searchId)
        relationRecords = self.getRelations(searchType, searchId)
        otherType = 'film'
        if searchType == otherType:
            otherType == 'cast'
        otherRecords = [self.getRecordbyId(
            otherType, sId) for sId in relationRecords[f'{otherType}Ids']]
        stats = self.filmStats(otherRecords)
        return {
            searchType: profileRecord,
            otherType: otherRecords,
            'stats': stats
            # 'elements': elements,
        }

# def getTmdbInfo(searchType, searchId):
#     with open(f'{utils.ROOT_DIR}/config.json') as json_file:
#         tmdb.API_KEY = json.load(json_file)['tmdbkey']
#     if searchType == 'cast':
#         result = tmdb.People(searchId)
#     elif searchType == 'film':
#         result = tmdb.Movies(searchId)
#     if result:
#         return result.info()

def loadFilmData():
    filmRecords = pd.read_csv(
        utils.ROOT_DIR + '\\templates\\hello\\data\\tmdb_5000_movies.csv'
    )
    filmRecords['filmId'] = pd.to_numeric(filmRecords['id'])
    jsonReady = filmRecords.to_dict('records')
    return jsonReady


def loadProjectData(limit=None):
    # To Do: finish refactoring into film and credit functtons
    filmRecords = []
    # filmRecords = loadFilmData()
    castRecords = []
    filmCastRecords = []
    creditData = pd.read_csv(
        utils.ROOT_DIR + '\\templates\\hello\\data\\tmdb_5000_credits.csv')
    if limit:
        creditData = creditData.head(limit)
    for filmCast in creditData.values:
        filmId = filmCast[0]
        # filmInfo = getTmdbInfo('film', filmId)
        # filmInfo['filmId'] = filmId
        # filmRecords.append(filmInfo)
        castList = json.loads(filmCast[2])
        for cast in castList:
            castId = cast['id']
            castRecords.append({'castId': castId,
                                'name': cast['name']})
            filmCastRecords.append({'filmCastId': int(str(filmId) + str(castId)),
                                    'filmId': filmId,
                                    'castId': castId})
    message = f'Successfully loaded {len(filmRecords)} films and {len(castRecords)} cast records'
    # pdb.set_trace()
    data = {
        'message': message,
        'film':  list({v['filmId']: v for v in filmRecords}.values()),
        'cast': list({v['castId']: v for v in castRecords}.values()),
        'filmCast': filmCastRecords
    }

    for f in data.keys():
        saveResult = utils.saveJsonData(data[f], f)

    return data


if __name__ == "__main__":
    # filmRecords = pd.read_csv(
    #     utils.ROOT_DIR + '\\templates\\hello\\data\\tmdb_5000_movies.csv'
    # )
    # filmRecords['id'] = pd.to_numeric(
    #     filmRecords['id'])
    # jsonReady = filmRecords.set_index('id').T.to_dict()
    d = loadCreditData(limit=2)
    # print(d)
    # d = loadCreditData(limit=2)
    # print(len(d['film']))
    # fn = FilmNetworks()
    # # castId = fn.data['cast'][10]['castId']
    # castId = 1180936
    # profile = fn.getProfile('cast', castId)
    # print(profile)
