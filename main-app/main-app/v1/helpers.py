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


def get_summary(balance_sheet):
    summary = {}

    for item in balance_sheet:
        year = item['year']
        profit_or_loss = item['profitOrLoss']

        if year in summary:
            summary[year] += profit_or_loss
        else:
            summary[year] = profit_or_loss

    return summary


def get_pre_assessment_value(balance_sheet, loan_amount):

    num_items = len(balance_sheet)

    if num_items != 12:
        abort(500, "Internal Server Error")

    pre_assessment_value = 20
    total_profit_or_loss = 0
    total_assets_value = 0

    for item in balance_sheet:
        total_profit_or_loss += item['profitOrLoss']
        total_assets_value += item['assetsValue']

    average_assets_value = total_assets_value / num_items

    if total_profit_or_loss > 0:
        pre_assessment_value = 60

    if average_assets_value > loan_amount:
        pre_assessment_value = 100

    return pre_assessment_value
