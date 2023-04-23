# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function
from . import Resource
from ..models import Users
from ..helpers import gen_token
from flask import request
from werkzeug.security import generate_password_hash
import uuid


class AuthSignup(Resource):

    def post(self):
        data = request.get_json()
        print(data, flush=True)
        if not data or not data.get('password') or not data.get('username'):
            return {'message': 'Username/Password Cannot be empty'}, 400, None

        user = Users.select().where(Users.username == data.get('username'))
        if not user.exists():
            uniquie_uuid = str(uuid.uuid4())
            Users.create(
                uuid=uniquie_uuid,
                username=data.get('username'),
                password=generate_password_hash(data.get('password'))
            )
            token = gen_token(uniquie_uuid, data.get('username'))
            return {'token': token}, 201, None
        else:
            return {'message': 'Username Taken'}, 409, None
