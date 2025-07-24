from sqlalchemy.orm import Session
import schemas, models
from fastapi import HTTPException, status

def studentSignUp(request: schemas.StudentsSignUp, db: Session):
    new_student = models.Student(full_name=request.name, email=request.email)
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return "Signed up successfully"

def getAllStudents(db: Session):
    all = db.query(models.Student).all()
    return all  