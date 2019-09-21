import json
import os
import tmdbsimple as tmdb
import templates.hello.wrangle as wrangle
import templates.hello.utils as utils
from flask import render_template, Blueprint, jsonify
hello_blueprint = Blueprint('hello', __name__)
fn = wrangle.FilmNetworks()


@hello_blueprint.route('/')
@hello_blueprint.route('/hello')
def index():
    return render_template("index.html")


@hello_blueprint.route('/api/tmdb/<searchType>/<searchId>')
def tmdbCast(searchType, searchId):
    # searchType: person, film
    # searchId: TMDB film or person id depending on searchType
    result = None
    with open(f'{utils.ROOT_DIR}/config.json') as json_file:
        tmdb.API_KEY = json.load(json_file)['tmdbkey']
    if searchType == 'person':
        result = tmdb.People(searchId)
    elif searchType == 'film':
        result = tmdb.Movies(searchId)
    if result:       
        return jsonify(result.info())
    # else:
        # handle bad request


@hello_blueprint.route('/api/<searchType>')
def getAll(searchType):
    return jsonify(fn.data[searchType][:6])


@hello_blueprint.route('/api/<searchType>/<searchId>')
def getProfile(searchType, searchId):
    return jsonify(fn.getProfile(searchType, searchId))


@hello_blueprint.route('/api/check')
def check():
    return jsonify({'message': wrangle.checkFiles()})


@hello_blueprint.route('/api/refresh')
def refresh():
    return jsonify({'message': wrangle.loadCreditData()})
