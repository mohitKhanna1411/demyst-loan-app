from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv, find_dotenv
from datetime import datetime, timedelta
from .models import Users
import os
import jwt
from flask_restplus import abort

load_dotenv(find_dotenv())
SECRET_KEY = os.environ.get("SECRET_KEY")

# generate JWT tokens, validity 2 hours


def gen_token(uuid, username):
    return jwt.encode({
        'uuid': uuid,
        'username': username,
        'exp': datetime.utcnow() + timedelta(minutes=120)
    }, SECRET_KEY, algorithm="HS256")

# decode the encoded jwt from headers and check validity


def authorize(headers):
    t = headers.get('Authorization', None)
    if not t:
        abort(403, 'Unsupplied Authorization Token')
    if t.split(" ")[0] != "Token":
        abort(400, "Authorization Token must start with 'Token'")
    try:
        t = t.split(" ")[1]
    except:
        abort(403, "Unsupplied Authorization Token")

    try:
        data = jwt.decode(t, SECRET_KEY, algorithms=["HS256"])
        print(data, flush=True)
    except:
        abort(401, "Token Expired")
    try:
        user = Users.select().where(Users.uuid == data['uuid']).dicts().get()
    except Users.DoesNotExist:
        abort(404, 'User Not Found')
    return user
