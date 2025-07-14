from fastapi import Depends, HTTPException, status
import schemas,JWT
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admin/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    # Create HTTP exception for invalid credentials
    # status_code=401: Unauthorized status code
    # detail: Error message explaining the issue
    # headers: Include WWW-Authenticate header for proper authentication flow
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    # Verify the JWT token and return the token data (user information)
    # If token is invalid, the verify_token function will raise the credentials_exception
    return JWT.verify_token(token=token, credentials_exception=credentials_exception)