from models import Workshops, Student, Registration, Admin
import datetime
import pytest

def test_create_workshops(db_session):
    test_workshop = Workshops(
        title="Testing",
        description="This is a testing workshop",
        date=datetime.datetime.now(),
        location="Testing location"
    )
    db_session.add(test_workshop)
    db_session.commit()
    assert test_workshop.id is not None


def test_create_student(db_session):
    testing_student = Student(
        full_name="Testing name",
        email="testing@gmail.com"
    )
    db_session.add(testing_student)
    db_session.commit()
    assert testing_student is not None


def test_create_registration(db_session):
    workshop = Workshops(
        title="Reg Workshop",
        description="Workshop for registration",
        date=datetime.datetime.now(),
        location="Reg Location"
    )
    db_session.add(workshop)
    db_session.commit()

    registration = Registration(
        name="Jane Doe",
        email="jane@example.com",
        workshops_id=workshop.id
    )
    db_session.add(registration)
    db_session.commit()
    assert registration.id is not None
    assert registration.workshops_id == workshop.id 