from fastapi import APIRouter, HTTPException, status, Depends
import schemas, database
from repositories import admin
from sqlalchemy.orm import Session 
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    tags=["admin"],
    prefix="/admin"
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_admin(response: schemas.AdminLogin, db: Session = Depends(database.get_db)):
    return admin.create_admin(response, db)

@router.post("/login", status_code=status.HTTP_200_OK)
def admin_login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    return admin.login(request, db)