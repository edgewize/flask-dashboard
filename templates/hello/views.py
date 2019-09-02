import json
import os
import templates.hello.wrangle as wrangle
import templates.hello.utils as utils
from flask import render_template, Blueprint, jsonify
hello_blueprint = Blueprint('hello', __name__)


@hello_blueprint.route('/')
@hello_blueprint.route('/hello')
def index():
    return render_template("index.html")


@hello_blueprint.route('/api/check')
def check():
    files = ['film', 'cast', 'filmCast']
    checkGood = True
    for f in files:
        path = f'{utils.ROOT_DIR}\\templates\\public\\data\\{f}.json'
        fileCheck = os.path.exists(path)
        if fileCheck is False:
            checkGood = False
        return jsonify({'message': checkGood})



@hello_blueprint.route('/api/refresh')
def refresh():
    return jsonify({'message': wrangle.loadCreditData()})
