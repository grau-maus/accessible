from datetime import datetime
from pprint import pprint
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Task

task_routes = Blueprint('tasks', __name__)


# GET ALL TASKS FROM CURRENT USER
@task_routes.route('/')
@login_required
def tasks():
    get_all_tasks = Task.query.filter(
        Task.user_id == 18
    ).all()
    print('teeeeeeeest')
    all_tasks = {task.id: task.to_dict() for task in get_all_tasks}
    print('teeeeeeeest')

    return all_tasks
