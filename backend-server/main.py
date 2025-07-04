from fastapi import FastAPI, Request
import uvicorn
# Libs for receiving emails
import os
from utils.email import send_email
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()
@app.get("/")
def test_api():
    return "hello"

@app.post("/send-email/")
async def send_email(request: Request):
    data = await request.json()
    subject = data.get("subject", "No Subject")
    body = data.get("body", "")
    to_email = os.getenv("EMAIL_USER")  
    send_email(subject, body, to_email)
    return {"message": "Email sent successfully"}


# if __name__ == "__main__":
#     # uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

