# from werkzeug.security import generate_password_hash
from datetime import datetime
from faker import Faker
from app.models import db, Task, User

fake = Faker()


# Adds a task, you can add other tasks here if you want
def seed_tasks():
    for i in range(500):
        fake_user_id = fake.pyint(min_value=16, max_value=100)
        user_role = User.query.get(fake_user_id).role
        task_type = ''

        if user_role == 'RN':
            task_type = 'Nurse visit'
        elif user_role == 'CNA':
            task_type = 'Home health aide visit'
        else:
            task_type = 'Therapy visit'

        new_task = Task(
            user_id=fake_user_id,
            patient_id=fake.pyint(min_value=1, max_value=1000),
            type=task_type,
            scheduled_visit=datetime(
                2022,
                fake.pyint(min_value=1, max_value=12),
                fake.pyint(min_value=1, max_value=28)
            ),
            completed=fake.boolean(chance_of_getting_true=40)
        )
        db.session.add(new_task)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the task table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_tasks():
    db.session.execute('''TRUNCATE tasks RESTART IDENTITY CASCADE;''')
    db.session.commit()
