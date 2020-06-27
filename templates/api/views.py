import json
import os
import hydrofunctions
import pandas as pd
import templates.utils as utils
from flask import render_template, Blueprint, jsonify, request
from flask_cors import CORS

api_blueprint = Blueprint('api', __name__)
cors = CORS(api_blueprint)


@api_blueprint.route('/api/sites/get/<stateCd>')
def geSites(stateCd):
    sites = hydrofunctions.NWIS(stateCd=stateCd)
    return jsonify(sites.json)


def buildArgsDict(args, keep_list):
    filter_args = {i: args[i] for i in args if i in keep_list}
    for i in keep_list:
        if i not in filter_args.keys():
            filter_args[i] = None
    return filter_args


def formatSiteData(hf_request, freq='D'):
    meta = hf_request.meta
    df = hf_request.df('discharge').reset_index()
    df['date'] = df['datetimeUTC'].apply(lambda x: pd.to_datetime(x.date()))
    df = df.drop('datetimeUTC', 1)
    discharge_col = df.columns[0]
    format_data = df.rename(
        columns={discharge_col: 'discharge'}).set_index('date')
    aggregate_dates = format_data.resample(freq).mean()
    aggregate_dates.index = [str(i.date()) for i in aggregate_dates.index]
    data = {
        'meta': meta,
        'timeSeries': aggregate_dates.to_dict()
    }
    return data


@api_blueprint.route('/api/flow/<siteId>')
def flow(siteId):
    args = request.args.to_dict()
    hydro_args = buildArgsDict(args, utils.HYDROFUNCTION_ARGS)
    print(hydro_args)
    hf_request = hydrofunctions.NWIS(
        siteId,  'dv', period=hydro_args['period'])
    data = formatSiteData(hf_request, freq=hydro_args['freq'])
    return jsonify(data)
