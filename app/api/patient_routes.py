from datetime import datetime
from pprint import pprint
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm.exc import UnmappedInstanceError
from app.models import db, Patient

patient_routes = Blueprint('patients', __name__)


# GET ALLLLLL PATIENTS (THIS IS A BAD IDEA)
@patient_routes.route('/')
@login_required
def patients():
    get_all_patients = Patient.query.all()

    all_patients = {patient.id: patient.to_dict()
                    for patient in get_all_patients}

    return all_patients


# GET SINGLE PATIENT
@patient_routes.route('/<int:patient_id>')
@login_required
def patient(patient_id):
    try:
        patient = Patient.query.get(patient_id)

        return patient.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Patient does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details'}, 500


# DELETE PATIENT
@patient_routes.route('/', methods=['DELETE'])
@login_required
def del_patient():
    try:
        patient_id = request.json['patientId']
        patient = Patient.query.get(patient_id)
        db.session.delete(patient)
        db.session.commit()

        return {'patientId': patient_id}
    except AttributeError:
        return {'error': 'Error 404. Patient does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Patient does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# EDIT PATIENT
@patient_routes.route('/', methods=['PATCH'])
@login_required
def edit_patient():
    try:
        patient_id = request.json['patientId']
        patient = Patient.query.get(patient_id)

        new_insurance = request.json['insuranceId']
        new_first_name = request.json['firstName']
        new_middle_name = request.json['middleName']
        new_last_name = request.json['lastName']
        new_dob = datetime(
            request.json['dobYear'],
            request.json['dobMonth'],
            request.json['dobDate']
        )
        new_mrn = request.json['mrn']
        new_ssn = request.json['ssn']
        new_address = request.json['address']
        new_phone_num = request.json['phoneNumber']
        new_status = request.json['active']
        new_auth_visits = request.json['authVisits']

        if new_insurance:
            patient.insurance_id = new_insurance
        if new_first_name:
            patient.first_name = new_first_name
        if new_middle_name:
            patient.middle_name = new_middle_name
        if new_last_name:
            patient.last_name = new_last_name
        if new_dob:
            patient.dob = new_dob
        if new_mrn:
            patient.mrn = new_mrn
        if new_ssn:
            patient.ssn = new_ssn
        if new_address:
            patient.primary_address = new_address
        if new_phone_num:
            patient.phone_number = new_phone_num
        if new_status:
            patient.active = new_status
        if new_auth_visits:
            patient.authorized_visits = new_auth_visits

        if (
            new_insurance or
            new_first_name or
            new_middle_name or
            new_last_name or
            new_dob or
            new_mrn or
            new_ssn or
            new_address or
            new_phone_num or
            new_status or
            new_auth_visits
        ):
            patient.updated_at = datetime.now()
        db.session.commit()

        return patient.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Patient does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Patient does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# ADD PATIENT
@patient_routes.route('/', methods=['POST'])
@login_required
def add_patient():
    try:
        new_insurance = request.json['insuranceId']
        new_first_name = request.json['firstName']
        new_middle_name = request.json['middleName']
        new_last_name = request.json['lastName']
        new_dob = datetime(
            request.json['dobYear'],
            request.json['dobMonth'],
            request.json['dobDate']
        )
        new_mrn = request.json['mrn']
        new_ssn = request.json['ssn']
        new_address = request.json['address']
        new_phone_num = request.json['phoneNumber']
        new_status = request.json['active']
        new_auth_visits = request.json['authVisits']

        if (
            not new_insurance or
            not new_first_name or
            not new_last_name
        ):
            return {'error': 'Error 500. Please provide insurance / first name / last name.'}, 500

        new_patient = Patient(
            insurance_id=new_insurance,
            first_name=new_first_name,
            middle_name=new_middle_name,
            last_name=new_last_name,
            dob=new_dob,
            mrn=new_mrn,
            ssn=new_ssn,
            primary_address=new_address,
            phone_number=new_phone_num,
            active=new_status,
            authorized_visits=new_auth_visits
        )

        db.session.add(new_patient)
        db.session.commit()

        return new_patient.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Patient does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Patient does not exist in the database'}, 404
    except KeyError:
        return {'error': 'Error 500. Check the DOB.'}, 500
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500
