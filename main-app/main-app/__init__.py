# -*- coding: utf-8 -*-
from __future__ import absolute_import
from v1.models import create_db
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS

import os

from flask import Flask

import v1
# get db from .env file
load_dotenv(find_dotenv())
DB_NAME = os.environ.get("DB_NAME")


# flask app creation
def create_app():
    app = Flask(__name__, static_folder='static')
    app.config['ERROR_404_HELP'] = False
    CORS(app)
    app.register_blueprint(
        v1.bp,
        url_prefix='/v1')

    return app


# main app
if __name__ == '__main__':
    # create db
    create_db(DB_NAME)
    create_app().run(debug=True, host='0.0.0.0', port=9000)
