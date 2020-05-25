from flask import Blueprint
import pandas as pd

data_api = Blueprint('data_api', __name__)


@data_api.route("/datarecords")
def get_data():
    data = pd.read_excel("../../data/fake_job_postings.xlsx")
    fraud = data[data['fraudulent'] == 1]
    real = data[data['fraudulent'] == 0]
    fraud = fraud.iloc[0:30]
    real = real.iloc[0:30]
    small_balanced_data = pd.concat([fraud, real])
    small_balanced_data_random = small_balanced_data.sample(frac=1).reset_index(drop=True)
    return small_balanced_data_random.to_json(orient='records')
