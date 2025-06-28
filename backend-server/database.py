# Import create_engine from SQLAlchemy to create database engine
from sqlalchemy import create_engine
# Import declarative_base to create base class for database models
from sqlalchemy.ext.declarative import declarative_base
# Import sessionmaker to create database session factory
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

############ DEFINE AN URL FOR THE SQLITE DB ##################
# This creates/connects to a file named 'gdg.db' in the current directory
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL") + "?sslmode=require" #Connect to the blog database


###### This creates/connects to a file named 'gdg.db' in the current directory ######
### connect_args{...} allows multiple threads to open a connection with the db
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Creates a Factory for db session objects using SQLAlchemy.
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()