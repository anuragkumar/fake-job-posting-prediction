from flask import Blueprint
from flask import render_template

eda_api = Blueprint('eda_api', __name__)


@eda_api.route("/eda")
def eda():
    return "list of accounts"


@eda_api.route("/scatterHTML")
def send_scatter_html():
    return render_template('scattertext_benefits.html')
