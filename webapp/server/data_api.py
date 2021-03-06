from flask import Blueprint
from data import Data

data_api = Blueprint('data_api', __name__)
data_obj = Data()


@data_api.route("/datarecords")
def get_data():
    return data_obj.get_random_sample().to_json(orient='records')


@data_api.route("/predictedDataRecords")
def get_predicted_data():
    return data_obj.get_predicted_random_sample().to_json(orient='records')


