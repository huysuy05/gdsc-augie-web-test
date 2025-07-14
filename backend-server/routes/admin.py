from fastapi import APIRouter, HTTPException, status, Depends
import schemas, database
from repositories import admin
from sqlalchemy.orm import Session 

router = APIRouter(
    tags=["admin"],
    prefix="/admin"
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_admin(response: schemas.AdminLogin, db: Session = Depends(database.get_db)):
    return admin.create_admin(response, db)