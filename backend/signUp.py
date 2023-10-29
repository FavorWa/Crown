from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from secret_values import mongodb_uri
import re


router = APIRouter()

# MongoDB connection
CONNECTION_STRING = mongodb_uri  
client = MongoClient(CONNECTION_STRING)
db = client['crown']  # Replace 'crown' with your database name
users_collection = db['UserInfo']  # Replace 'UserInfo' with your collection name

# Create a unique index on the 'email' field
users_collection.create_index("email", unique=True)


class User(BaseModel):
    name: str
    email: str
    password: str


@router.post('/sign_up')
async def sign_up(user: User):
    try:
        print("Hello")
        user_data = {
            "name": user.name,
            "email": user.email,
            "password": user.password,
        }
        if not user.name or not user.email or not user.password:
            raise HTTPException(status_code=400, detail="Email, name or password cannot be empty.")
        if len(user.password) < 8 or not re.search(r"\d", user.password) or not re.search(r"[a-zA-Z]", user.password):
            raise HTTPException(status_code=400, detail="Password must be at least 8 characters long and contain at least one letter and one number.")
        result = users_collection.insert_one(user_data)
        if result.inserted_id:
            return {"message": "Sign up successful."}
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Email already exists in the database.")
