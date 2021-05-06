# from werkzeug.security import generate_password_hash
from faker import Faker
from app.models import db, Assignment

fake = Faker()


# Adds a assignment, you can add other assignments here if you want
def seed_assignments():
    for i in range(500):
        new_assignment = Assignment(
            professional_id=fake.pyint(min_value=1, max_value=200),
            patient_id=fake.pyint(min_value=1, max_value=1000)
        )
        db.session.add(new_assignment)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the assignment table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_assignments():
    db.session.execute('''TRUNCATE assignments RESTART IDENTITY CASCADE;''')
    db.session.commit()
