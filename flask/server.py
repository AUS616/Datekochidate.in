from flask import Flask, jsonify,request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

#Add the db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///spots.db'
#intialize the db
db = SQLAlchemy(app)

#Define the model
class Spot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    image = db.Column(db.String(300))
    description = db.Column(db.String(500))
    rating = db.Column(db.Float)
    price = db.Column(db.String(50))
    link = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    verified = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()


@app.route('/', methods=['GET'])
def get_places():
    spots = Spot.query.all()
    spots_list = [{
        'id': spot.id,
        'name': spot.name,
        'image': spot.image,
        'description': spot.description,
        'rating': spot.rating,
        'price': spot.price,
        'link': spot.link,
        'created_at': spot.created_at,
        'verified': spot.verified
    } for spot in spots]
    return jsonify(spots_list)

@app.route('/places', methods=['POST'])
def add_place():
    data = request.json
    place = Spot(
        name=data.get("name"),
        image=data.get("image"),
        rating=data.get("rating"),
        price=data.get("price"),
        verified=data.get("verified", False),
        description=data.get("description")
    )
    db.session.add(place)
    db.session.commit()
    return jsonify({"message": "Place added successfully"}), 201


if __name__ == '__main__':
    app.run(debug=True)