from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

load_dotenv()

mongodb_uri = os.getenv("mongodb_uri")
router = APIRouter()

# MongoDB connection
CONNECTION_STRING = mongodb_uri  
client = MongoClient(CONNECTION_STRING)
db = client['crown']  # Replace 'crown' with your database name
users_collection = db['UserInfo']  # Replace 'UserInfo' with your collection name


class User(BaseModel):
    email: str
    password: str
    keepLoggedIn: bool


@router.post('/log_in')
async def log_in(user: User):
    if not user.email or not user.password:
        raise HTTPException(status_code=400, detail="Email or password cannot be empty.")

    stored_user = users_collection.find_one({"email": user.email, "password": user.password})
    if stored_user:
        users_collection.update_one(
            {"email": user.email, "password": user.password},
            {"$set": {"keepLoggedIn": user.keepLoggedIn}}
        )
        stored_user['_id'] = str(stored_user['_id'])
        # return JSONResponse(content={"message": "Login successful.", "keepLoggedIn": user.keepLoggedIn})
        return JSONResponse(content={"message": "Login successful.", "user": stored_user})
    else:
        raise HTTPException(status_code=401, detail="email or password incorrect!")