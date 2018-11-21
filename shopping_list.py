from flask import Flask
from flask import redirect, url_for
from flask import request, make_response, Response
from flask import send_from_directory, jsonify
import json
import os

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'list.html')  

@app.route('/save', methods=['POST'])
def save():
    with open('file.json', 'wb') as outfile:
        outfile.write(request.data)
    return "Success"
    

@app.route('/get', methods=['GET'])
def get():
    if os.path.isfile('file.json'):
        with open('file.json', 'r') as infile:
            data = json.load(infile)
        response = jsonify(data)
        return response
    else:
        data = []
        response = jsonify(data)
        return response
    

if __name__ == '__main__':
    app.run()