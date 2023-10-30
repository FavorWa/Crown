from fastapi import APIRouter, HTTPException, UploadFile, File
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from secret_values import mongodb_uri
import json
from bson import ObjectId

router = APIRouter()

# MongoDB connection
CONNECTION_STRING = mongodb_uri  
client = MongoClient(CONNECTION_STRING)
db = client['crown']  # Replace 'crown' with your database name
users_collection = db['UserInfo']  # Replace 'UserInfo' with your collection name


class User(BaseModel):
    email: str
    password: str


@router.post('/get_user_info')
async def get_user_info(user: User):
    # return 0
    user_info = users_collection.find_one({"email": user.email, "password": user.password})
    if user_info:
        print(f"User found: {user_info}")

        # Convert ObjectId to string
        user_info['_id'] = str(user_info['_id'])

        return JSONResponse(content=user_info, status_code=200)
    else:
        raise HTTPException(status_code=404, detail="User not found")
    
    

@router.post('/change_avatar')
async def change_avatar(user_email: str, avatar_file: UploadFile = File(...)):
    contents = await avatar_file.read()
    # Here you can process the avatar image file.
    # You can save the image to a specific location or database.
    # You can update the user's avatar in your database using the user's email (user_email).

    # Example of updating the user's avatar in the database
    user_info = users_collection.find_one_and_update(
        {"email": user_email},
        {"$set": {"avatar": contents}},
        return_document=True
    )

    if user_info:
        return {"message": "Avatar updated successfully"}
    else:
        return {"message": "User not found"}

# Your other code here...





