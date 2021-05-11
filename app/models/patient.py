from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db


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
        db.String(10),
        default='0'
    )
    ssn = db.Column(
        db.String(9),
        default='0'
    )
    primary_address = db.Column(
        db.Text,
        default='N/A'
    )
    phone_number = db.Column(
        db.String(7),
        default=0
    )
    active = db.Column(
        db.Boolean,
        default=True
    )
    authorized_visits = db.Column(
        db.Integer,
        default=0
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
    patient_assignments = relationship(
        'Assignment',
        backref='assignment_patient',
        cascade='all, delete'
    )
    patient_tasks = relationship(
        'Task',
        backref='task_patient',
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
            'authorizedVisits': self.authorized_visits,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
