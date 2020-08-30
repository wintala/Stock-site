from flask import Flask, request
from flask_cors import CORS, cross_origin
import yahoo_stonks

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/api/ticker", methods=["GET"])
@cross_origin()
def get_tickers():
    return yahoo_stonks.company_ticker(request.args.get('company'))

@app.route("/api/data", methods=["GET"])
@cross_origin()
def get_data():
    print("jii")
    return yahoo_stonks.data_getter(request.args.get('ticker'))

@app.route('/<path:path>')
@cross_origin()
def catch_all(path):
    return {"error": "unknown endpoint"}
