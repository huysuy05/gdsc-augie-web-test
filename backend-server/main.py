from fastapi import FastAPI, Request
import uvicorn
# Libs for receiving emails
import os
# from utils import emails
from dotenv import load_dotenv
import models
from database import engine
from routes import workshops
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(workshops.router)
origins = [
    "http://localhost:3000/",
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

# @app.post("/send-email/")
# async def send_email(request: Request):
#     data = await request.json()
#     subject = data.get("subject", "No Subject")
#     body = data.get("body", "")
#     to_email = os.getenv("EMAIL_USER")  
#     emails.send_email(subject, body, to_email)
#     return {"message": "Email sent successfully"}


# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

