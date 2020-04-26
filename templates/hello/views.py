from flask_cors import CORS
import json
import os
import templates.hello.utils as utils
import templates.hello.RiverFlow as RiverFlow
from flask import render_template, Blueprint, jsonify, request
hello_blueprint = Blueprint('hello', __name__)
cors = CORS(hello_blueprint)


@hello_blueprint.route('/')
def index():
    return render_template("index.html")


def buildArgsDict(args, keep_list):
    filter_args = {i: args[i] for i in args if i in keep_list}
    for i in keep_list:
        if i not in filter_args.keys():
            filter_args[i] = None
    return filter_args


@hello_blueprint.route('/api/flow/<siteId>')
def flow(siteId):
    args = request.args.to_dict()
    hydro_args = buildArgsDict(args, utils.HYDROFUNCTION_ARGS)
    dashboard = RiverFlow.Dashboard(siteId, hydro_args)
    dashboard_arg_names = ['freq', 'compare_years']
    dashboard_args = buildArgsDict(args, dashboard_arg_names)
    time_frequency = dashboard_args['freq']
    if time_frequency is None and dashboard.period is not None:
        # gets lst letter from hydrofunction periods like P7D
        time_frequency = dashboard.period[-1:]
    site_info = dashboard.siteInfo()
    data = {'info': site_info}
    if dashboard.data is not None:
        if dashboard_args['compare_years'] is None:
            chart_data = dashboard.frequencyByYear(
                time_frequency=time_frequency)
            stats_data = chart_data
        else:
            compare_years = [int(i)
                             for i in dashboard_args['compare_years'].split(',')]
            chart_data = dashboard.avgComparison(
                compare_years, time_frequency=time_frequency)
            stats_data = dashboard.multiYearComparison(
                compare_years, time_frequency=time_frequency)
        stats = dashboard.getYearlyStats(stats_data)
        timeline = utils.lineChart(chart_data)
        above_min_counts = dashboard.countAboveMin(dashboard.data)
        donut = utils.donutChart(above_min_counts)
        data['stats'] = {'yearly': stats}
        data['charts'] = {'timeline': timeline, 'session': donut}
    return jsonify(data)


@hello_blueprint.route('/api/sites/getinfo')
def sites():
    data = RiverFlow.getSiteData()
    return jsonify(data)
