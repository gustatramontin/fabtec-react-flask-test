from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Define the Book model
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {"id": self.id, "title": self.title, "author": self.author}

# Create tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def home():
    return "Welcome to the Book API!"

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get("username")
    password = request.json.get("password")


    if username != "gustavo" or password != "the lord":
        return jsonify({"error": "Senha ou usuário errado );"}), 401

    token = create_access_token(identity=username)
    return jsonify(token=token)

@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([b.to_dict() for b in books])

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)
    return jsonify(book.to_dict()) if book else ('Not Found', 404)

@app.route('/books', methods=['POST'])
@jwt_required()
def add_book():
    current_user = get_jwt_identity()

    print(current_user)
    data = request.get_json()
    new_book = Book(title=data['title'], author=data['author'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify(new_book.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)

'''
curl -X POST localhost:5000/login -d '{"username":"gustavo","password":"the lord"}' -H 'Content-Type: application/json'
'''
