from fastapi import APIRouter, HTTPException, FastAPI
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

load_dotenv()

mongodb_uri = os.getenv("mongodb_uri")

router = APIRouter()
app = FastAPI()

# MongoDB connection
CONNECTION_STRING = mongodb_uri  
client = MongoClient(CONNECTION_STRING)
db = client['crown']  # Replace 'crown' with your database name
users_collection = db['UserInfo']  # Replace 'UserInfo' with your collection name

class User(BaseModel):
    email: str
    avatarNumber: str

class Email(BaseModel):
    email: str

@router.post('/change_avatar')
async def change_avatar(user: User):
    if not user.email or not user.avatarNumber:
        raise HTTPException(status_code=400, detail="Email or avatarNumber cannot be empty.")

    stored_user = users_collection.find_one({"email": user.email})
    if stored_user:
        users_collection.update_one(
            {"email": user.email},
            {"$set": {"avatarNumber": user.avatarNumber}}
        )
        return JSONResponse(content={"message": "change avatar successful."})

    else:
        raise HTTPException(status_code=401, detail="email incorrect!")
    
@router.post('/get_user_info')
def get_user_info(body: Email):
    if not body.email:
        raise HTTPException(status_code=400, detail="Email needed.")
    
    user = users_collection.find_one({"email": body.email})
    if user:
        return {
            "hairType": user["hairType"]
        }
    
    else:
        raise HTTPException(status_code=404, detail="User not found.")

