# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
from ..helpers import authorize, get_summary, get_pre_assessment_value
from flask_restplus import abort
from ..client.decision_engine.app import get_final_outcome
from . import Resource
from .. import schemas


class LoanApplication(Resource):

    def post(self):
        data = request.get_json()

        try:
            authorize(g.headers)
        except:
            abort(403, "Invalid Auth Token")

        pre_assesment_value = get_pre_assessment_value(
            data.get('sheet')[0:12], data.get('loan_amount'))

        summary = get_summary(data.get('sheet'))

        final_outcome = get_final_outcome(data.get('name'), data.get('year_established'),
                                          summary, pre_assesment_value)

        return {'loan_outcome': final_outcome}, 200, None
