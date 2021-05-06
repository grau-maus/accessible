from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db


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
            'type': self.type,
            'scheduledDate': self.scheduled_visit,
            'completed': self.completed,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
