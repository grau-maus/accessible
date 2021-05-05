# from werkzeug.security import generate_password_hash
from faker import Faker
from app.models import db, Medical_Professional

fake = Faker()


# Adds a medical professional, you can add other medical
# professionals here if you want
def seed_professionals():
    for i in range(200):
        fake_profile = fake.profile()
        new_primary = Medical_Professional(
            name=fake_profile['name'],
            efax=fake.pyint(min_value=1000000, max_value=9999999),
            address=fake_profile['address'],
            phone_number=fake.pyint(min_value=1000000, max_value=9999999),
            npi_number=fake.pyint(min_value=1000000000, max_value=9999999999)
        )
        db.session.add(new_primary)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the medical professional table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_professionals():
    db.session.execute(
        '''TRUNCATE medical_professionals RESTART IDENTITY CASCADE;''')
    db.session.commit()
