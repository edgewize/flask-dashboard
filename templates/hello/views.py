import json
import os
import templates.hello.wrangle as wrangle
import templates.hello.utils as utils
import templates.hello.RiverFlow as RiverFlow
from flask import render_template, Blueprint, jsonify, request
hello_blueprint = Blueprint('hello', __name__)
# fn = wrangle.FilmNetworks()


@hello_blueprint.route('/')
def index():
    return render_template("index.html")


@hello_blueprint.route('/api/flow/<siteId>')
def flow(siteId):
    periodInQstring = request.args.get('period')
    period = periodInQstring if periodInQstring else 'P30M'
    data = RiverFlow.Dashboard(siteId, period=period)
    return jsonify(data.chartData())