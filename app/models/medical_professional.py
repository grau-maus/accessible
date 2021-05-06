from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db


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
        db.String(7),
        nullable=False
    )
    npi_number = db.Column(
        db.String(10),
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
    professional_assignment = relationship(
        'Assignment',
        backref='assignment_professional',
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
