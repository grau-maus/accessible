# from werkzeug.security import generate_password_hash
from faker import Faker
from app.models import db, Insurance

fake = Faker()

insurance = [
    'AETNA', 'United Health Care', 'Kaiser Permanente',
    'Highmark', 'Cigna', 'WellCare', 'HUMANA', 'HCSC',
    'BlueCross BlueShield'
]

insurance_type = [
    'HMO', 'EPO', 'POS', 'PPO', 'HDHP w/ HSA', 'HDHP w/o HSA'
]


# Adds an insurance, you can add other insurances here if you want
def seed_insurances():
    for ele in insurance:
        new_insurance = Insurance(
            name=ele,
            type=insurance_type[fake.pyint(min_value=0, max_value=5)],
        )

        db.session.add(new_insurance)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the insurances table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_insurances():
    db.session.execute('''TRUNCATE insurances RESTART IDENTITY CASCADE;''')
    db.session.commit()
