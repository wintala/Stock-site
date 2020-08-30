from flask import Flask, request
import yahoo_stonks

app = Flask(__name__)

@app.route("/api/ticker", methods=["GET"])
def get_tickers():
    return yahoo_stonks.company_ticker(request.args.get('company'))

@app.route("/api/data", methods=["GET"])
def get_data():
    print("jii")
    return yahoo_stonks.data_getter(request.args.get('ticker'))

@app.route('/<path:path>')
def catch_all(path):
    return {"error": "unknown endpoint"}

if __name__ == "__main__":
    app.run(debug=True)