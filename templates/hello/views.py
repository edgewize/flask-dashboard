import json
import os
import templates.hello.wrangle as wrangle
import templates.hello.utils as utils
from flask import render_template, Blueprint, jsonify
hello_blueprint = Blueprint('hello', __name__)
fn = wrangle.FilmNetworks()


@hello_blueprint.route('/')
@hello_blueprint.route('/hello')
def index():
    return render_template("index.html")


@hello_blueprint.route('/api/<searchType>')
def getAll(searchType):
    return jsonify(fn.data[searchType])


@hello_blueprint.route('/api/<searchType>/<searchId>')
def getProfile(searchType, searchId):
    return jsonify(fn.getProfile(searchType, searchId))
    # return jsonify(fn.getRecordbyId(searchType, searchId))
    

@hello_blueprint.route('/api/check')
def check():
    return jsonify({'message': wrangle.checkFiles()})



@hello_blueprint.route('/api/refresh')
def refresh():
    return jsonify({'message': wrangle.loadCreditData()})
