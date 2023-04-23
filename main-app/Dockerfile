FROM python:3.6.8-alpine
ADD . /main-app
WORKDIR /main-app
RUN pip3 install --upgrade pip
RUN pip install -r requirements.txt
EXPOSE 9000
CMD python3 -u main-app/__init__.py