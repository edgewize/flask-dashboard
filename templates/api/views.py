import json
import os
import pandas as pd
import templates.utils as utils
# managing own hydrofunctions because latest update bloated with dependencies
import templates.api.hydrofunctions.__init__ as hydrofunctions
from flask import render_template, Blueprint, jsonify, request
from flask_cors import CORS

api_blueprint = Blueprint('api', __name__)
cors = CORS(api_blueprint)


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
    hf_request = hydrofunctions.NWIS(
        siteId,  'dv', period=hydro_args['period'])
    data = formatSiteData(hf_request, freq=hydro_args['freq'])
    return jsonify(data)

# @pmt_blueprint.route('/api/<module_name>/<class_name>/<method_name>', methods=['POST', 'GET'])
# def method_caller(module_name, class_name, method_name):
#     """
#     Imports module, inits class, and calls method with kwargs
#     """
#     full_module_name = "templates.pmt.lib." + module_name
#     module_to_import = importlib.import_module(full_module_name)
#     class_to_call = getattr(module_to_import, class_name)
#     method_to_call = getattr(class_to_call(), method_name)
#     data = method_to_call(**request.args)
#     return jsonify(data)
