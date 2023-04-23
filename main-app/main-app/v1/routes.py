from __future__ import absolute_import

from .api.auth_login import AuthLogin
from .api.auth_signup import AuthSignup
from .api.loan_balanceSheet import LoanBalancesheet
from .api.loan_application import LoanApplication


routes = [
    dict(resource=AuthLogin, urls=['/auth/login'], endpoint='auth_login'),
    dict(resource=AuthSignup, urls=['/auth/signup'], endpoint='auth_signup'),
    dict(resource=LoanBalancesheet, urls=[
         '/loan/balanceSheet'], endpoint='loan_balanceSheet'),
    dict(resource=LoanApplication, urls=[
         '/loan/application'], endpoint='loan_application'),
]
