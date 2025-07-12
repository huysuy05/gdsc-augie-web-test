# Import BaseModel from pydantic for data validation and serialization
from pydantic import BaseModel
# Import List type hint for defining list fields
from typing import List
from datetime import datetime

# Define a Pydantic Model for Workshop Creation.
class WorkShopsBase(BaseModel):
    title: str
    
    # class Config:
    #     arbitrary_types_allowed = True

class Workshops(WorkShopsBase):
    description: str
    date: datetime
    location: str
    class Config():
        from_attributes = True
        
# Flat attendee schema for response (no reference back to workshops)
class RegisStudentOut(BaseModel):
    name: str
    email: str
    registered_on: datetime
    class Config():
        from_attributes = True
    

class ShowWorkShops(Workshops):
    id: int
    created_at: datetime
    updated_at: datetime
    attendees: List[RegisStudentOut] = []
    class Config:
        from_attributes = True

class ShowRegisStudent(BaseModel):
    name: str
    email: str
    registered_on: datetime
    workshops: ShowWorkShops
    class Config():
        from_attributes = True  


class StudentsSignUp(BaseModel):
    name: str
    email: str




class AdminLogin(BaseModel):
    username: str
    password: str
    


    