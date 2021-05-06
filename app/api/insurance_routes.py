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
        # insurance_id = request.json['insuranceId']
        insurance_id = 4
        insurance = Insurance.query.get(insurance_id)
        db.session.delete(insurance)
        db.session.commit()

        return {'message': 'Success.'}
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
        # insurance_id = request.json['insuranceId']
        insurance_id = request.json['insuranceId']
        insurance = Insurance.query.get(insurance_id)

        assigned_staff = request.json['staffId']
        assigned_patient = request.json['patientId']
        visit_type = request.json['visitType']
        scheduled_date = request.json['scheduledDate']
        status = request.json['status']

        if assigned_staff:
            insurance.user_id = assigned_staff
        if assigned_patient:
            insurance.patient_id = assigned_patient
        if visit_type:
            insurance.type = visit_type
        if scheduled_date:
            insurance.scheduled_visit = scheduled_date
        if status is not None:
            insurance.completed = status

        if (
            assigned_staff or
            assigned_patient or
            visit_type or
            scheduled_date or
            status is not None
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
