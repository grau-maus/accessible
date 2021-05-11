from datetime import datetime
from pprint import pprint
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm.exc import UnmappedInstanceError
from app.models import db, Insurance

insurance_routes = Blueprint('insurances', __name__)


# GET ALL HEALTH INSURANCE
@insurance_routes.route('/')
@login_required
def insurances():
    get_all_insurance = Insurance.query.all()
    all_insurance = {insurance.id: insurance.to_dict()
                     for insurance in get_all_insurance}

    return all_insurance


# GET SINGLE INSURANCE
@insurance_routes.route('/<int:insurance_id>')
@login_required
def insurance(insurance_id):
    try:
        insurance = Insurance.query.get(insurance_id)

        return insurance.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Insurance does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# DELETE INSURANCE
@insurance_routes.route('/', methods=['DELETE'])
@login_required
def del_insurance():
    try:
        insurance_id = request.json['insuranceId']
        insurance = Insurance.query.get(insurance_id)
        db.session.delete(insurance)
        db.session.commit()

        return {'insuranceId': insurance_id}
    except AttributeError:
        return {'error': 'Error 404. Insurance does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Insurance does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# EDIT INSURANCE
@insurance_routes.route('/', methods=['PATCH'])
@login_required
def edit_insurance():
    try:
        insurance_id = request.json['insuranceId']
        insurance = Insurance.query.get(insurance_id)

        new_name = request.json['name']
        new_type = request.json['type']

        if new_name:
            insurance.name = new_name
        if new_type:
            insurance.type = new_type

        if (
            new_name or
            new_type
        ):
            insurance.updated_at = datetime.now()
        db.session.commit()

        return insurance.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Insurance does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Insurance does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# ADD INSURANCE
@insurance_routes.route('/', methods=['POST'])
@login_required
def add_insurance():
    try:
        new_name = request.json['name']
        new_type = request.json['type']

        if not new_name:
            return {'error': 'Error 500. Please provide a name for the insurance.'}, 500

        new_insurance = Insurance(
            name=new_name,
            type=new_type,
        )

        db.session.add(new_insurance)
        db.session.commit()

        return new_insurance.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Insurance does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Insurance does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500
