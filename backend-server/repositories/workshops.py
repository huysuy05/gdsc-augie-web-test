from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException, status
from datetime import datetime
from typing import List


# A GET method to fetch all workshops from the db
def get_all(db:Session):
    # workshops = 
    data = db.query(models.Workshops).all()
    return data

#A GET method to fetch single workshop from the db
def get_single(id: int, db: Session):
    single  = db.query(models.Workshops).filter(models.Workshops.id == id).first()
    if not single:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Error fetching workshops #{id}!")
    return single

# A POST method to create a new workshop
def create_post(request: schemas.Workshops, db:Session):
    new_data = models.Workshops(title=request.title, 
                                description=request.description, 
                                date=request.date,
                                created_at=datetime.now(),
                                updated_at=datetime.now(),
                                location=request.location,
                                )
    db.add(new_data)
    db.commit()
    db.refresh(new_data)

    return new_data

# A PUT Method to update an existing workshop
def update_workshop(id: int, request: schemas.Workshops, db: Session):
    workshop = db.query(models.Workshops).filter(models.Workshops.id == id )
    if not workshop.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Cannot fetch #{id} workshop!")
    workshop.update(request.model_dump())
    db.commit()
    return f"Successfully Updated Workshop {id}"

# A DELETE Method to delete a single workshop
def delete(db: Session):
    return "Test endpoints"