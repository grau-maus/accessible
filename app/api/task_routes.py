from datetime import datetime
from pprint import pprint
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm.exc import UnmappedInstanceError
from app.models import db, Task

task_routes = Blueprint('tasks', __name__)


# GET ALL TASKS FROM CURRENT USER
@task_routes.route('/')
@login_required
def tasks():
    get_all_tasks = Task.query.filter(
        Task.user_id == current_user.id
    ).all()
    all_tasks = {task.id: task.to_dict() for task in get_all_tasks}

    return all_tasks


# GET SINGLE TASK
@task_routes.route('/<int:task_id>')
@login_required
def task(task_id):
    try:
        task = Task.query.get(task_id)

        return task.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Task does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# DELETE TASK
@task_routes.route('/', methods=['DELETE'])
@login_required
def del_task():
    try:
        task_id = request.json['taskId']
        task = Task.query.get(task_id)
        db.session.delete(task)
        db.session.commit()

        return {'message': 'Success.'}
    except AttributeError:
        return {'error': 'Error 404. Task does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Task does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# EDIT TASK
@task_routes.route('/', methods=['PATCH'])
@login_required
def edit_task():
    try:
        task_id = request.json['taskId']
        task = Task.query.get(task_id)

        assigned_staff = request.json['staffId']
        assigned_patient = request.json['patientId']
        visit_type = request.json['visitType']
        scheduled_date = request.json['scheduledDate']
        status = request.json['status']

        if assigned_staff:
            task.user_id = assigned_staff
        if assigned_patient:
            task.patient_id = assigned_patient
        if visit_type:
            task.type = visit_type
        if scheduled_date:
            task.scheduled_visit = scheduled_date
        if status is not None:
            task.completed = status

        if (
            assigned_staff or
            assigned_patient or
            visit_type or
            scheduled_date or
            status is not None
        ):
            task.updated_at = datetime.now()
        db.session.commit()

        return task.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Task does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Task does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500


# ADD TASK
@task_routes.route('/', methods=['POST'])
@login_required
def add_task():
    try:
        assigned_staff = request.json['staffId']
        assigned_patient = request.json['patientId']
        visit_type = request.json['visitType']
        scheduled_date = request.json['scheduledDate']
        status = request.json['status']

        new_task = Task(
            user_id=assigned_staff,
            patient_id=assigned_patient,
            type=visit_type,
            scheduled_visit=scheduled_date,
            completed=status
        )

        db.session.add(new_task)
        db.session.commit()

        return new_task.to_dict()
    except AttributeError:
        return {'error': 'Error 404. Task does not exist in the database'}, 404
    except UnmappedInstanceError:
        return {'error': 'Error 404. Task does not exist in the database'}, 404
    except:
        return {'error': 'Error 500. Contact your administrator for more details.'}, 500
