# from werkzeug.security import generate_password_hash
from faker import Faker
from app.models import db, Task

fake = Faker()


# Adds a task, you can add other tasks here if you want
def seed_tasks():
    for i in range(5000):
        new_task = Task(
            user_id=fake.pyint(min_value=6, max_value=100),
            patient_id=fake.pyint(min_value=1, max_value=1000),
            type='N/A',
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
