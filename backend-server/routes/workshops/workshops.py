from fastapi import APIRouter, status
from .. import schemas, database, oauth2
from typing import List
from repositories import workshops
from sqlalchemy.orm import Session


route = APIRouter(
    tags=["workshops"],
    prefix="/workshops"
)


@route.get("/", response_model=List[schemas.showWorkshops])
def fetch_all_workshops(db: Session):
    return workshops.get_all(db)

@route.get("/{id}", status_code=status.HTTP_200_OK)
def fetch_single_workshop(db:Session):
    return workshops.get_single(db)


