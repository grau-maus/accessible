from .db import db


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
