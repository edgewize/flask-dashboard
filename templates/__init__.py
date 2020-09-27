import os
from flask import Flask
import templates.utils as utils
from templates.hello.views import hello_blueprint
from templates.api.views import api_blueprint

app = Flask(__name__,
            static_folder=utils.ROOT_DIR + '/build/static',
            template_folder=utils.ROOT_DIR + '/build')

# register the blueprints
blueprints = [hello_blueprint, api_blueprint]

[app.register_blueprint(blueprint) for blueprint in blueprints]
