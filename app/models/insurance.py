from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db


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
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
