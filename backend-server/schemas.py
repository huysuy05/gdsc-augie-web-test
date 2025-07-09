# Import BaseModel from pydantic for data validation and serialization
from pydantic import BaseModel
# Import List type hint for defining list fields
from typing import List


class WorkShops(BaseModel):
    title: str
    description: str

    