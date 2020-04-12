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


@hello_blueprint.route('/api/flow/<siteId>')
def flow(siteId):
    # params = ['period', 'startDate', ]
    # import pdb; pdb.set_trace()
    dashboard = RiverFlow.Dashboard(siteId, period=request.args.get('period'),
                                    start_date=request.args.get('startDate'), end_date=request.args.get('end_date'))
    if request.args.get('freq'):
        data = dashboard.build(freq=request.args.get('freq'))
    else:
        data = dashboard.build()
    return jsonify(data)

@hello_blueprint.route('/api/sites/getinfo')
def sites():
    data =  RiverFlow.getSiteData()
    return jsonify(data)