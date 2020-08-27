from flask import Flask, request, jsonify
import yahoo_stonks

app = Flask(__name__)

@app.route("/ticker", methods=["GET"])
def get_tickers():
    return yahoo_stonks.company_ticker(request.args.get('company'))

@app.route("/data", methods=["GET"])
def get_data():
    print("jii")
    return yahoo_stonks.data_getter(request.args.get('ticker'))

@app.route('/<path:path>')
def catch_all(path):
    return jsonify({"error": "unknown endooint"})

if __name__ == "__main__":
    app.run(debug=True)