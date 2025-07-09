from fastapi import APIRouter
from .. import schemas, database, oauth2
from typing import List


route = APIRouter(
    tags=["workshops"],
    prefix="/workshops"
)


@route.get("/", response_model=List[schemas.showWorkshops])
def fetch_all_workshops():
    return "Fetching"