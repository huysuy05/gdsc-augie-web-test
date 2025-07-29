from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
import schemas, database
from repositories import register
from typing import List

router = APIRouter(
    prefix="/register",
    tags=["workshop-register"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def register_workshop(request: schemas.RegisStudentOut, db: Session=Depends(database.get_db)):
    return register.register_workshop(request, db)


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[schemas.ShowRegisStudent])
def get_all_attendees(db: Session=Depends(database.get_db)):
    return register.get_all_attendees(db)
