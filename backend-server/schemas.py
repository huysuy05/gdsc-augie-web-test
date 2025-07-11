# Import BaseModel from pydantic for data validation and serialization
from pydantic import BaseModel
# Import List type hint for defining list fields
from typing import List
from datetime import datetime

# Define a Pydantic Model for Workshop data.
class WorkShops(BaseModel):
    title: str
    description: str
    date: datetime
    # class Config:
    #     arbitrary_types_allowed = True


class ShowWorkShops(WorkShops):
    class Config:
        from_attributes = True


class StudentsSignUp(BaseModel):
    name: str
    email: str


class RegisStudent(BaseModel):
    name: str
    email: str
    registered_on: datetime
    # class Config():
    #     arbitrary_types_allowed = True


class AdminLogin(BaseModel):
    username: str
    password: str
    


    