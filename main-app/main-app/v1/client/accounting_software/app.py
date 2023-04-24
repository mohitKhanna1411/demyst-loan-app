import json
import random


def get_balance_sheet():
    file_path = '/main-app/main-app/v1/client/accounting_software/data.json'
    f = open(file_path)
    data = json.load(f)
    start_position = int(random.randint(0, len(data['sheet'])-20))
    data = data['sheet'][start_position:start_position+20]
    print({'sheet': data}, flush=True)
    return data
