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
        return ({'message': 'Error 401. Contact your administrator for more details.'}, 401)
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


# GET SINGLE USER
@user_routes.route('/<int:user_id>')
@login_required
def user(user_id):
    if current_user.role != 'admin':
        return {'message': 'Error 401. Contact your administrator for more details.'}, 401
    user = User.query.get(user_id)
    return user.to_dict()


# DELETE USER
@user_routes.route('/', methods=['DELETE'])
@login_required
def del_user():
    if current_user.role != 'admin':
        return {'message': 'Error 401. Contact your administrator for more details.'}, 401
    user_id = request.json['userId']
    old_user = User.query.get(user_id)
    db.session.delete(old_user)
    db.session.commit()
    return {'message': 'Success'}


# EDIT USER
@user_routes.route('/', methods=['PATCH'])
@login_required
def edit_user():
    if current_user.role != 'admin':
        return {'message': 'Error 401. Contact your administrator for more details.'}, 401
    user_id = request.json['userId']
    new_first_name = request.json['firstName']
    new_last_name = request.json['lastName']
    new_email = request.json['email']
    new_role = request.json['role']
    new_password = request.json['password']

    if new_first_name:
        edit_user.first_name = new_first_name
    if new_last_name:
        edit_user.last_name = new_last_name
    if new_email:
        edit_user.email = new_email
    if new_role:
        edit_user.role = new_role
    if new_password:
        edit_user.password = new_password

    edit_user.updated_at = datetime.now()

    db.session.commit()

    return edit_user.to_dict()


# ADD USER
@user_routes.route('/', methods=['POST'])
@login_required
def add_user():
    if current_user.role != 'admin':
        return {'message': 'Error 401. Contact your administrator for more details.'}, 401
        user_id = request.json['userId']
    new_first_name = request.json['firstName']
    new_last_name = request.json['lastName']
    new_email = request.json['email']
    new_role = request.json['role']
    new_password = request.json['password']

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


# # DELETE PATIENT
# @user_routes.route('/2')
# @login_required
# def del_patient():
#     # patient_id = request.json['patientId']
#     patient_id = 315
#     old_patient = Patient.query.get(patient_id)
#     db.session.delete(old_patient)
#     db.session.commit()
#     return {'message': 'Success'}
