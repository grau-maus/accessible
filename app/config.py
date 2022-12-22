import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL').replace("postgres://", "postgresql://", 1)
  SQLALCHEMY_ECHO=True
