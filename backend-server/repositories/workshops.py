from sqlalchemy.orm import Session
from sqlalchemy import DateTime
import models
from fastapi import HTTPException, status




# A GET method to fetch all workshops from the db
def get_all(db:Session):
    # workshops = 
    data = db.query(models.Workshops).all()
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Error fetching all workshops!")
    return data

#A GET method to fetch single workshop from the db
def get_single(id: int, db: Session):
    single  = db.query(models.Workshops).filter(id == models.Workshops.id).first()
    if not single:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Error fetching workshops #{id}!")
    return single

# A POST method to create a new workshop
def add_post(db:Session):
    return "Test endpoints"

# A PUT Method to update an existing workshop
def update_post(db: Session):
    return "Test endpoints"

# A DELETE Method to delete a single workshop
def delete(db: Session):
    return "Test endpoints"