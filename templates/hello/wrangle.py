import os
import json
import pandas as pd
import templates.hello.utils as utils


def loadCreditData():
    filmRecords = {}
    castRecords = {}
    filmCastRecords = []
    creditData = pd.read_csv(
        utils.ROOT_DIR + '\\templates\\hello\\data\\tmdb_5000_credits.csv')
    for filmCast in creditData.values:
        filmId = filmCast[0]
        filmRecords[filmId] = filmCast[1]
        castList = json.loads(filmCast[2])
        for cast in castList:
            castId = cast['id']
            castRecords[castId] = cast['name']
            filmCastRecord = {'rel_id': int(str(filmId) + str(castId)),
                              'film_id': filmId, 'cast_id': castId}
            filmCastRecords.append(filmCastRecord)

    data = {
        'film': filmRecords,
        'cast': castRecords,
        'filmCast': filmCastRecord
    }

    for f in data.keys():
        path = f'{utils.ROOT_DIR}\\templates\\public\\data\\{f}.json'
        with open(path, 'w') as outfile:
            json.dump(data, outfile)

    return True

