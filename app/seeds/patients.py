# from werkzeug.security import generate_password_hash
from faker import Faker
from app.models import db, Patient

fake = Faker()


# Adds a patient, you can add other patients here if you want
def seed_patients():
    for i in range(1000):
        fake_profile = fake.profile()
        fake_middle_name = None
        add_middle_name = fake.boolean(chance_of_getting_true=45)

        if add_middle_name:
            fake_middle_name = fake.profile()['name'].split(' ')[-1]

        new_patient = Patient(
            insurance_id=fake.pyint(min_value=1, max_value=9),
            first_name=fake_profile['name'].split(' ')[0],
            middle_name=fake_middle_name,
            last_name=fake_profile['name'].split(' ')[-1],
            dob=fake_profile['birthdate'],
            mrn=fake.pyint(min_value=1, max_value=9999),
            ssn=fake.pyint(min_value=100000000, max_value=999999999),
            primary_address=fake_profile['address'],
            phone_number=fake.pyint(min_value=1000000, max_value=9999999),
            active=fake.boolean(chance_of_getting_true=50)
        )
        db.session.add(new_patient)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the patient table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_patients():
    db.session.execute('''TRUNCATE patients RESTART IDENTITY CASCADE;''')
    db.session.commit()
