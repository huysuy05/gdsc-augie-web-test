import hashing, database, schemas, models
from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session

def create_admin(response: schemas.AdminLogin, db: Session):
    admin = models.Admin(username=response.username, password=hashing.Hash.bcrypt(response.password))
    return admin