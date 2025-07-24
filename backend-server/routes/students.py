from fastapi import APIRouter, HTTPException, status, Depends
import schemas, database, oauth2
from sqlalchemy.orm import Session
from repositories import students
from typing import List

router = APIRouter(
    tags=["students"],
    prefix="/students"
)


@router.post("/", status_code=status.HTTP_201_CREATED)
def studentSignUp(request: schemas.StudentsSignUp, db: Session = Depends(database.get_db)):
    return students.studentSignUp(request, db)

@router.get("/", status_code=status.HTTP_200_OK, response_model=List[schemas.StudentsSignUp]            )
def getAllStudents(db: Session = Depends(database.get_db)):
    return students.getAllStudents(db)

