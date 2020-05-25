from flask import Flask
from eda import eda_api
from data import data_api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(eda_api, url_prefix='/eda')
app.register_blueprint(data_api, url_prefix='/data')


@app.route("/")
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run()
