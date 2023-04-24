# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
from flask_restplus import abort
from ..helpers import authorize
from ..client.accounting_software.app import get_balance_sheet


from . import Resource
from .. import schemas


class LoanBalancesheet(Resource):

    def post(self):
        try:
            user = authorize(g.headers)
        except:
            abort(403, "Invalid Auth Token")

        # calling downstream - accounting-software
        data = get_balance_sheet()
        return {'sheet': data}, 200, None
