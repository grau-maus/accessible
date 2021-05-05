# from werkzeug.security import generate_password_hash
from faker import Faker
from app.models import db, User

fake = Faker()

roles = [
    'admin', 'S', 'RN', 'CNA', 'PT',
    'PTA', 'OT', 'OTA', 'ST', 'STA'
]


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        first_name='Jun',
        last_name='Doe',
        email='demo@user.io',
        role='admin',
        password='password',
    )

    db.session.add(demo)

    for i in range(4):
        fake_user_deets = fake.profile()
        fake_user = User(
            first_name=fake_user_deets['name'].split(' ')[0],
            last_name=fake_user_deets['name'].split(' ')[-1],
            email=fake_user_deets['mail'],
            role='admin',
            password=fake.password(length=10)
        )

        db.session.add(fake_user)

    for i in range(95):
        fake_user_deets = fake.profile()
        fake_user = User(
            first_name=fake_user_deets['name'].split(' ')[0],
            last_name=fake_user_deets['name'].split(' ')[-1],
            email=fake_user_deets['mail'],
            role=roles[fake.pyint(min_value=1, max_value=9)],
            password=fake.password(length=10)
        )

        db.session.add(fake_user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('''TRUNCATE users RESTART IDENTITY CASCADE;''')
    db.session.commit()
