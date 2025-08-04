from fastapi import FastAPI, Request
import uvicorn
# Libs for receiving emails
import os
# from utils import emails
from dotenv import load_dotenv
import models
from database import engine
from routes import workshops, admin, students, register
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(workshops.router)
app.include_router(admin.router)
app.include_router(students.router)
app.include_router(register.router)


origins = [
    "http://localhost:3000",
    "https://v0-google-developer-group-app.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def test_api():
    return "This is the root url for the backend server, hit /docs to see more about the endpoints"



