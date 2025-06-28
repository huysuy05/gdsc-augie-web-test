from .database import Base
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime

class Workshops(Base):
    __tablename__ = "workshops-db"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)
    location = Column(String)
    attendees = relationship("Registration", back_populates="name")


class Student(Base):
    __tablename__ = "students-db"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String)


class Registration(Base):
    __tablename__ = "regis-db"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    registered_on = Column(DateTime, default=datetime.datetime.now)
    worshops = relationship("Workshops", back_populates="title")

class Admin(Base):
    pass




