from fastapi import APIRouter, status, Depends
import schemas, database, oauth2
from typing import List
from repositories import workshops
from sqlalchemy.orm import Session


router = APIRouter(
    tags=["workshops"],
    prefix="/workshops"
)


@router.get("/", response_model=List[schemas.ShowWorkShops])
def fetch_all_workshops(db: Session = Depends(database.get_db)):
    return workshops.get_all(db)

@router.get("/{id}", status_code=status.HTTP_200_OK)
def fetch_single_workshop(db: Session = Depends(database.get_db)):
    return workshops.get_single(id, db)


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_post(response: schemas.Workshops, db: Session = Depends(database.get_db)):
    return workshops.create_post(response, db)