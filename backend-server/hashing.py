# Import passlib lib for password hashing and account verification
from passlib.context import CryptContext


###### Hashing Class to endcrypt the password of users. ##########
# Create a password hashing context using bcrypt algorithm
# schemes=["bcrypt"]: specifies bcrypt as the hashing algorithm
# deprecated="auto": automatically handles deprecated hash formats
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# A Hash Object to handle methods like hashing passwords and verify password
class Hash():

    # Static method to hash a plain text pwd using bcrypt algorithm 
    def bcrypt(password: str):
        return pwd_context.hash(password)
    
    # Static method to verify a plain text password against a hashed pwd
    def verify(hashed_pwd, plain_pwd):
        # Compare the plain text pwd with the hashed pwd
        # Returns True if they match, otherwise False
        return pwd_context.verify(plain_pwd, hashed_pwd)


## More resources for the bcrypt algorithm: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
