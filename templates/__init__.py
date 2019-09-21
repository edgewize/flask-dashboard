from templates.hello.views import hello_blueprint
from flask import Flask
import templates.hello.utils as utils
app = Flask(__name__,
            static_folder=utils.ROOT_DIR + '\\build\\static',
            template_folder=utils.ROOT_DIR + "\\build")

# register the blueprints
app.register_blueprint(hello_blueprint)
