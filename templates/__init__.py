import templates.utils as utils
from flask import Flask
from templates.hello.views import hello_blueprint
from templates.api.views import api_blueprint

app = Flask(__name__,
            static_folder=utils.ROOT_DIR + '/build/static',
            template_folder=utils.ROOT_DIR + '/build')

# register the blueprints
app.register_blueprint(hello_blueprint)
app.register_blueprint(api_blueprint)
