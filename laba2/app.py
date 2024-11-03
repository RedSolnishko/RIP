from flask import Flask, request, jsonify
from models import db, Hotel

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
db.init_app(app)

@app.route('/hotels', methods=['POST'])
def create_hotel():
    data = request.json
    new_hotel = Hotel(name=data['name'], location=data['location'], stars=data['stars'])
    db.session.add(new_hotel)
    db.session.commit()
    return jsonify({'message': 'Hotel created!'}), 201

@app.route('/hotels', methods=['GET'])
def get_hotels():
    hotels = Hotel.query.all()
    return jsonify([{'name': hotel.name, 'location': hotel.location, 'stars': hotel.stars} for hotel in hotels])

@app.route('/hotels/<int:id>', methods=['PUT'])
def update_hotel(id):
    data = request.json
    hotel = Hotel.query.get(id)
    if hotel:
        hotel.name = data['name']
        hotel.location = data['location']
        hotel.stars = data['stars']
        db.session.commit()
        return jsonify({'message': 'Hotel updated!'})
    return jsonify({'message': 'Hotel not found'}), 404

@app.route('/hotels/<int:id>', methods=['DELETE'])
def delete_hotel(id):
    hotel = Hotel.query.get(id)
    if hotel:
        db.session.delete(hotel)
        db.session.commit()
        return jsonify({'message': 'Hotel deleted!'})
    return jsonify({'message': 'Hotel not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
