from fastapi import APIRouter, status, Depends
import schemas, database
from typing import List
from repositories import workshops
from sqlalchemy.orm import Session


router = APIRouter(
    tags=["workshops"],
    prefix="/workshops"
)


@router.get("/", response_model=List[schemas.ShowWorkShops], status_code=status.HTTP_200_OK)
def fetch_all_workshops(db: Session = Depends(database.get_db)):
    return workshops.get_all(db)

@router.get("/{id}", response_model=schemas.ShowWorkShops, status_code=status.HTTP_200_OK)
def fetch_single_workshop(id: int, db: Session = Depends(database.get_db)):
    return workshops.get_single(id, db)


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_workshop(response: schemas.Workshops, db: Session = Depends(database.get_db)):
    return workshops.create_post(response, db)

@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_workshop(id: int, response: schemas.Workshops, db : Session = Depends(database.get_db)):
    return workshops.update_workshop(id, response, db)

@router.delete("/{id}", status_code=status.HTTP_202_ACCEPTED)
def delete_workshop(id: int, db : Session = Depends(database.get_db)):
    return workshops.delete(id, db)