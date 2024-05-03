from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)

@app.route('/get_location_names')
def get_location_names():
    print("hello get feautures", flush=True)
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    print("Hello, world!", flush=True)

    try:
        request_data = request.json
        print(request_data)

        total_sqft = float(request_data['total_sqft'])
        location = request_data['location']
        bhk = int(request_data['bhk'])
        bath = int(request_data['bath'])
        print(bath, bhk, total_sqft, location)

        estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)

        response = jsonify({
            'estimated_price': estimated_price
        })

        response.headers.add('Access-Control-Allow-Origin', '*')
        print("response is: ", response)
        return response

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(host='0.0.0.0', port=8080)
