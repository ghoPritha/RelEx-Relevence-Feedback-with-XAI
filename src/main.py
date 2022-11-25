from types import MethodDescriptorType
import flask
from flask import jsonify, request
from flask import json
from flask_cors import CORS

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

all_heroes = [ { 'id': 11, 'name': 'Dr Nice' },
  { 'id': 12, 'name': 'Narco' },
  { 'id': 13, 'name': 'Bombasto' },
  { 'id': 14, 'name': 'Celeritas' },
  { 'id': 15, 'name': 'Magneta' },
  { 'id': 16, 'name': 'RubberMan' },
  { 'id': 17, 'name': 'Dynama' },
  { 'id': 18, 'name': 'Dr IQ' },
  { 'id': 19, 'name': 'Magma' },
  { 'id': 20, 'name': 'Tornado' }]

@app.route('/heroes', methods=['GET'])
def heroes():
    name = request.args.get('searchString')
    print (name)
    return jsonify(name)

@app.route('/heroes', methods=['POST'])
def update_record():
    record = json.loads(request.data)
    # new_records = []
    # with open('/tmp/data.txt', 'r') as f:
    #     data = f.read()
    #     records = json.loads(data)
    # for r in records:
    #     if r['name'] == record['name']:
    #         r['email'] = record['email']
    #     new_records.append(r)
    # with open('/tmp/data.txt', 'w') as f:
    #     f.write(json.dumps(new_records, indent=2))
    print(request.data)
    return jsonify(record)


app.run()