from fastapi import APIRouter, HTTPException, status
import schemas, database, oauth2

router = APIRouter(
    tags=["admin"],
    prefix="/admin"
)


# @router.post('/', status_code=status.HTTP_201_CREATED)
# def create_user(response: schemas.AdminLogin)