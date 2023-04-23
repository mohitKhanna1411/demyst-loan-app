# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
from . import Resource
from ..helpers import gen_token
from ..models import Users
from flask import request, g
from werkzeug.security import check_password_hash


class AuthLogin(Resource):

    def post(self):
        print(g.json, flush=True)

        data = request.get_json()
        if not data or not data.get('username') or not data.get('password'):
            return {'message': 'Username/Password Cannot be empty'}, 400, None
        try:
            user = Users.select().where(Users.username == data.get('username')).dicts().get()
            print(user, flush=True)
        except Users.DoesNotExist:
            return {'message': 'Invalid Username/Password'}, 401, None

        if check_password_hash(user['password'], data.get('password')):
            token = gen_token(user['uuid'], user['username'])
        else:
            return {'message': 'Invalid Username/Password'}, 401, None
        return {'token': token}, 200, None
