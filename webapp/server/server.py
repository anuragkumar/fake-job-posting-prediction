from flask import Flask, send_from_directory
from eda import eda_api
from data_api import data_api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(eda_api, url_prefix='/eda')
app.register_blueprint(data_api, url_prefix='/data')


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/data/<path:filepath>')
def data(filepath):
    return send_from_directory('data', filepath)

# @app.route('/<path:path>', methods=['GET'])
# def static_proxy(path):
#     return send_from_directory('../dist', path)
#
#
# @app.route('/')
# def root():
#     return send_from_directory('../dist/', 'index.html')


if __name__ == "__main__":
    app.run(threaded=True, port=5000)
