from flask import Flask
import requests


app = Flask(__name__)
r = requests.get('https://now.httpbin.org/')

@app.route("/")
def hello():
    return r.text


if __name__ == "__main__":
    app.run()