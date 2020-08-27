from pandas_datareader import data
from datetime import datetime
import requests
import json


def company_ticker(company):
    x = requests.get(f"http://d.yimg.com/autoc.finance.yahoo.com/autoc?query={company}&region=US&lang=en-US&row=ALL&callback=YAHOO.Finance.SymbolSuggest.ssCallback")
    json_string = x.text.replace("YAHOO.Finance.SymbolSuggest.ssCallback(", "").replace(");", "")
    return json_string


def data_getter(ticker):
    try:
        start_date = "2010-1-1"
        end_date = datetime.now().strftime("%Y-%m-%d")

        frame = data.DataReader(ticker, "yahoo", start_date, end_date)
        frame.index = frame.index.map(lambda x: x.strftime("%Y-%m-%d"))
        frame.reset_index(inplace=True)
        data_dict = frame.to_dict("records")
        json_data = json.dumps(data_dict)

    except Exception as e: 
        print(e)
        json_data = ""

    return json_data