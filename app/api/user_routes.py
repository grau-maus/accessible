from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User

user_routes = Blueprint('users', __name__)


# GET ALL USERS
@user_routes.route('/')
@login_required
def users():
    if current_user.role != 'admin':
        return {'error': 'Error 401. Contact your administrator for more details.'}, 401
    users = User.query.all()

    return {"users": {user.id: user.to_dict() for user in users}}


# GET ALL VISITING STAFF
@user_routes.route('/visiting/')
@login_required
def visit_users():
    if current_user.role != 'admin':
        return {'error': 'Error 401. Contact your administrator for more details.'}, 401
    users = User.query.filter(
        User.role != 'admin',
        User.role != 'S'
    ).all()

    return {"users": {user.id: user.to_dict() for user in users}}


# GET SINGLE USER
@user_routes.route('/<int:user_id>/')
@login_required
def user(user_id):
    if current_user.role != 'admin':
        return {'error': 'Error 401. Contact your administrator for more details.'}, 401
    user = User.query.get(user_id)

    return user.to_dict()


# DELETE USER
@user_routes.route('/', methods=['DELETE'])
@login_required
def del_user():
    if current_user.role != 'admin':
        return {'error': 'Error 401. Contact your administrator for more details.'}, 401

    user_id = request.json['userId']

    if user_id == 1:
        return {'error': 'Error 401. Unable to delete demo account.'}, 401

    if current_user.id == user_id:
        return {'error': 'Error 401. Unable to delete personal account.'}, 401

    old_user = User.query.get(user_id)

    db.session.delete(old_user)
    db.session.commit()

    return {'userId': user_id}


# EDIT USER
@user_routes.route('/', methods=['PATCH'])
@login_required
def edit_user():
    if current_user.role != 'admin':
        return {'error': 'Error 401. Contact your administrator for more details.'}, 401

    user_id = request.json['userId']

    if user_id == 1:
        return {'error': 'Error 401. Demo account not editable.'}, 401

    if current_user.id == user_id:
        return {'error': 'Error 401. Unable to edit personal account.'}, 401

    new_first_name = request.json['firstName']
    new_last_name = request.json['lastName']
    new_email = request.json['email']
    new_role = request.json['role']
    new_password = request.json['password']

    edited_user = User.query.get(user_id)

    if new_first_name:
        edited_user.first_name = new_first_name
    if new_last_name:
        edited_user.last_name = new_last_name
    if new_email:
        edited_user.email = new_email
    if new_role:
        edited_user.role = new_role
    if new_password:
        edited_user.password = new_password

    edited_user.updated_at = datetime.now()

    db.session.commit()

    return edited_user.to_dict()


# ADD USER
@user_routes.route('/', methods=['POST'])
@login_required
def add_user():
    try:
        if current_user.role != 'admin':
            return {'error': 'Error 401. Contact your administrator for more details.'}, 401

        new_first_name = request.json['firstName']
        new_last_name = request.json['lastName']
        new_email = request.json['email']
        new_role = request.json['role']
        new_password = request.json['password']

        if (
            not new_first_name or
            not new_last_name or
            not new_email or
            not new_role or
            not new_password
        ):
            return {'error': 'Error 500. Values must not be null.'}, 500

        new_user = User(
            first_name=new_first_name,
            last_name=new_last_name,
            email=new_email,
            role=new_role,
            password=new_password
        )

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict()
    except TypeError:
        return {'error': 'Error 500. Values must not be null.'}, 500
