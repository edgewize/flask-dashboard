from flask_cors import CORS
import json
import os
import templates.utils as utils
import templates.api.RiverFlow as RiverFlow
from flask import render_template, Blueprint, jsonify, request
hello_blueprint = Blueprint('hello', __name__)
cors = CORS(hello_blueprint)


@hello_blueprint.route('/')
def index():
    return render_template("index.html")



