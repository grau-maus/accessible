from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    first_name = db.Column(
        db.String(50),
        nullable=False
    )
    last_name = db.Column(
        db.String(50),
        nullable=False
    )
    email = db.Column(
        db.String(255),
        nullable=False,
        unique=True
    )
    role = db.Column(
        db.String(50),
        nullable=False
    )
    hashed_password = db.Column(
        db.String(255),
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )
    updated_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )

    # associations
    user_patient = relationship(
        'Patient',
        secondary='tasks',
        back_populates='patient_user',
        cascade='all, delete'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'role': self.role,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


class Insurance(db.Model):
    __tablename__ = 'insurances'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    name = db.Column(
        db.String(255),
        nullable=False
    )
    type = db.Column(
        db.String(255),
        nullable=False
    )
    authorized_visits = db.Column(
        db.Integer,
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )
    updated_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )

    # associations
    insurance_patient = relationship(
        'Patient',
        backref='patient_insurance',
        cascade='all, delete'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'authorizedVisits': self.authorized_visits,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


class Medical_Professional(db.Model):
    __tablename__ = 'medical_professionals'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    name = db.Column(
        db.String(120),
        nullable=False
    )
    efax = db.Column(
        db.Integer,
        default=0
    )
    address = db.Column(
        db.Text,
        nullable=False
    )
    phone_number = db.Column(
        db.Integer,
        nullable=False
    )
    npi_number = db.Column(
        db.Integer,
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )
    updated_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )

    # associations
    professional_patient = relationship(
        'Patient',
        secondary='assignments',
        back_populates='patient_professional',
        cascade='all, delete'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'efax': self.efax,
            'address': self.address,
            'phoneNumber': self.phone_number,
            'npiNumber': self.npi_number,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


class Assignment(db.Model):
    __tablename__ = 'assignments'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    professional_id = db.Column(
        db.Integer,
        db.ForeignKey('medical_professionals.id')
    )
    patient_id = db.Column(
        db.Integer,
        db.ForeignKey('patients.id')
    )


class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    insurance_id = db.Column(
        db.Integer,
        db.ForeignKey('insurances.id'),
        nullable=False
    )
    first_name = db.Column(
        db.String(50),
        nullable=False
    )
    middle_name = db.Column(
        db.String(50)
    )
    last_name = db.Column(
        db.String(50),
        nullable=False
    )
    dob = db.Column(
        db.DateTime,
        default=datetime(1100, 12, 31)  # datetime(year, month, date)
    )
    mrn = db.Column(
        db.Integer,
        default=0
    )
    ssn = db.Column(
        db.Integer,
        default=0
    )
    primary_address = db.Column(
        db.Text,
        default='N/A'
    )
    phone_number = db.Column(
        db.Integer,
        default=0
    )
    active = db.Column(
        db.Boolean,
        default=True
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )
    updated_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )

    # associations
    patient_user = relationship(
        'User',
        secondary='tasks',
        back_populates='user_patient',
        cascade='all, delete'
    )
    patient_professional = relationship(
        'Medical_Professional',
        secondary='assignments',
        back_populates='professional_patient',
        cascade='all, delete'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'middleName': self.middle_name,
            'lastName': self.last_name,
            'dob': self.dob,
            'insurance': self.patient_insurance.to_dict(),
            'mrn': self.mrn,
            'ssn': self.ssn,
            'primaryAddress': self.primary_address,
            'phoneNumber': self.phone_number,
            'active': self.active,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False
    )
    patient_id = db.Column(
        db.Integer,
        db.ForeignKey('patients.id'),
        nullable=False
    )
    type = db.Column(
        db.String(255),
        nullable=False
    )
    scheduled_visit = db.Column(
        db.DateTime,
        nullable=False
    )
    completed = db.Column(
        db.Boolean,
        default=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )
    updated_at = db.Column(
        db.DateTime,
        default=datetime.now()
    )

    def to_dict(self):
        return {
            'id': self.id,
            'staff': self.task_user.to_dict(),
            'patient': self.task_patient.to_dict(),
            'completed': self.completed,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
