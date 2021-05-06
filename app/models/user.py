from sqlalchemy.orm import relationship
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from .db import db


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
    user_task = relationship(
        'Task',
        backref='task_user',
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
