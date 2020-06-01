from flask import Blueprint
from flask import render_template, send_from_directory
from flask import jsonify
from flask import request
from data import Data

eda_api = Blueprint('eda_api', __name__)
data_obj = Data()


@eda_api.route("/eda")
def eda():
    return "list of accounts"


# @eda_api.route("/scatterHTML")
# def send_scatter_html():
#     return render_template('scattertext_benefits.html', password=u"You should know, right?")


@eda_api.route("/industry", methods=['POST'])
def get_industry_bar_plot_data():
    req_data = request.get_json()
    req = req_data.get('plotName')
    flag = req_data.get('boolean')
    return jsonify(data_obj.get_plot_data(req, flag))


@eda_api.route("/origPlot", methods=['POST'])
def get_orig_bar_plot_data():
    req_data = request.get_json()
    req = req_data.get('plotName')
    flag = req_data.get('boolean')
    return jsonify(data_obj.get_orig_plot_data(req, flag))


