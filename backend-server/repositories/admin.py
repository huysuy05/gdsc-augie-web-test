import hashing, database, schemas, models, JWT
from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

def create_admin(response: schemas.AdminLogin, db: Session):
    admin = models.Admin(username=response.username, password=hashing.Hash.bcrypt(response.password))
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


def login(request: OAuth2PasswordRequestForm , db: Session):
    user = db.query(models.Admin).filter(models.Admin.username == request.username).first()
    # Raise Exception when there is not such admin user
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cannot find admin user")
    # Raise exception when the password is not correct
    if not hashing.Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong password")
    access_token = JWT.create_access_token(data={"sub": user.username})
    return {"access_token":access_token, "token_type": "bearer"}
