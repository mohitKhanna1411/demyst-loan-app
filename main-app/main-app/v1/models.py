from peewee import SqliteDatabase, Model, TextField, AutoField, DateTimeField
import os
from datetime import datetime
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
DB_NAME = os.environ.get("DB_NAME")
db = SqliteDatabase(DB_NAME)

# basetable


class BaseTable(Model):
    class Meta:
        database = db

# Users inheriting basetable
# Users table defination


class Users(BaseTable):
    id = AutoField()
    uuid = TextField(null=False)
    created_at = DateTimeField(default=datetime.now())
    username = TextField(null=False, unique=True)
    password = TextField(null=False)


def create_db(db_file):
    # check for file
    if os.path.exists(db_file):
        print("Database already exists.")
        return False
    # creating the tables
    db.connect()
    db.create_tables([Users])
