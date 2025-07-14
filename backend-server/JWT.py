from datetime import datetime, timedelta, timezone
import schemas
import jwt, os
from dotenv import load_dotenv

load_dotenv()

SECRET_JWT_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

#Function to create a new JWT Access Token
def create_access_token(data: dict):
    #Copy the log in data to avoid changing the original
    to_encode = data.copy()

    # Set an expired timestamp based on the current log in time
    expire = datetime.now(timezone.utc) + timezone(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # Add a new field "exp" into the log in data
    to_encode.update({"exp": expire})
    # Generate a JWT Access Token for authorization and return it
    encoded_jwt = jwt.encode(to_encode, SECRET_JWT_KEY, ALGORITHM)
    return encoded_jwt


def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_JWT_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None: 
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    
    except: 
        raise credentials_exception