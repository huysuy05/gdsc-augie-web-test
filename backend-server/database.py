# Import create_engine from SQLAlchemy to create database engine
from sqlalchemy import create_engine
# Import declarative_base to create base class for database models
from sqlalchemy.orm import declarative_base
# Import sessionmaker to create database session factory
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()


######## THIS IS THE DATABASE URL FOR THE SUPABASE DB #########
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL") #Connect to the workshop database

###### Catch any erros if there is something wrong with the db url
if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("DATABASE_URL env variables is not yet set")


###### THIS CREATES/CONNECTS A DATABASE ENGINE ######
### connect_args{...} allows multiple threads to open a connection with the db
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Creates a Factory for db session objects using SQLAlchemy.
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()