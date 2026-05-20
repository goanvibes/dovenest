from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
# Enable CORS to allow the frontend HTML files to communicate with this API
CORS(app) 

DB_FILE = 'bookings.json'

def load_db():
    """Reads the JSON database securely."""
    if not os.path.exists(DB_FILE):
        return []
    try:
        with open(DB_FILE, 'r') as file:
            return json.load(file)
    except json.JSONDecodeError:
        return []

def save_db(data):
    """Writes to the JSON database."""
    with open(DB_FILE, 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/api/availability', methods=['GET'])
def get_availability():
    """Endpoint for the frontend to fetch all booked dates."""
    data = load_db()
    return jsonify(data), 200

@app.route('/api/admin/book', methods=['POST'])
def lock_date():
    """Secure endpoint for the admin panel to push new bookings."""
    payload = request.json
    
    if not payload or not payload.get('date'):
        return jsonify({"error": "Date is required"}), 400

    db = load_db()
    
    # Check if date already exists
    if any(booking['date'] == payload['date'] for booking in db):
        return jsonify({"error": "Date is already booked"}), 409

    new_entry = {
        "date": payload.get('date'),
        "status": "Booked",
        "event": payload.get('event', 'Private Booking')
    }
    
    db.append(new_entry)
    save_db(db)
    
    return jsonify({"success": True, "message": "Date successfully locked."}), 201

if __name__ == '__main__':
    # Run the server on port 5000
    print("🕊️ Dove Nest Backend Engine Running...")
    app.run(host='0.0.0.0', port=5000, debug=True)
  
