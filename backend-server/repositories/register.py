import schemas, models
from sqlalchemy.orm import Session
from datetime import datetime

def register_workshop(request: schemas.RegisStudentOut, db: Session):
    new_student = models.Registration(name=request.name,
                                      email=request.email,
                                      registered_on=datetime.now(),
                                      workshops_id=request.workshops_id
                                      )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return "Register Successfully"

def get_all_attendees(db: Session):
    all_students = db.query(models.Registration).all()
    return all_students