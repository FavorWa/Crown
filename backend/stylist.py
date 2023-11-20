from secret_values import yelp_api_key
from db import get_database
import requests
from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from secret_values import mongodb_uri
from typing import List, Dict, Union

db = get_database()

router = APIRouter()

# MongoDB connection
CONNECTION_STRING = mongodb_uri  
client = MongoClient(CONNECTION_STRING)
db = client['crown']  # Replace 'crown' with your database name
users_collection = db['UserInfo']  # Replace 'UserInfo' with your collection name

class Request(BaseModel):
    email: str
    request: str
    latitude: float
    longitude: float
    range: int

@router.post('/get_barbershop_from_yelp_api')
async def get_barbershop_from_yelp_api(info: Request):
    # radius is in meters
    url = "https://api.yelp.com/v3/businesses/search"
    headers = {
        "Authorization": f"Bearer {yelp_api_key}",
        "Accept": "application/json"
    }

    params = {
        "term": info.request,
        "latitude": info.latitude,
        "longitude": info.longitude,
        "sort_by": "best_match",
        "limit": 7,
        "radius": info.range * 1000
    }

    # return('process is on going')
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        json_data = response.json()
        return json_data.get("businesses", [])
    else:
        print(f"Error: {response.status_code}")
        return []



def get_details_from_yelp_api(id: str):
    url = f"https://api.yelp.com/v3/businesses/{id}"
    headers = {
        "Authorization": f"Bearer {yelp_api_key}",
        "Accept": "application/json"
    }
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        print(response.json())
    else:
        print(f"Error: {response.status_code}, {response.text}")



def get_service_offerings_from_yelp_api(id: str):
    url = f"https://api.yelp.com/v3/businesses/XHQEFR-Zlu1wvfx6cRAERA/reviews?limit=20&sort_by=yelp_sort"
    headers = {
        "Authorization": f"Bearer {yelp_api_key}",
        "Accept": "application/json"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print(response.json())
    else:
        print(f"Error: {response.status_code}, {response.text}")

# Example usage
# get_service_offerings_from_yelp_api("XHQEFR-Zlu1wvfx6cRAERA")

class Stylist(BaseModel):
    email: str
    tags: List[str]
    bio: str
    businessHours: Dict[str, Dict[str, Union[str, None]]]  # Update the type
    services: List[Dict[str, str]]  # Assuming services have names and prices

@router.post('/saveStylistProfile')
async def saveProfile(profile: Stylist):

    stored_user = users_collection.find_one({"email": profile.email})
    if stored_user:
        users_collection.update_one(
            {"email": profile.email},
            {"$set": {
                "tags": profile.tags,
                "bio": profile.bio,
                "businessHours": profile.businessHours,
                "services": profile.services
            }}
        )
        stored_user['_id'] = str(stored_user['_id'])
        return JSONResponse(content={"message": "Profile updated successfully.", "user": stored_user})
    else:
        raise HTTPException(status_code=401, detail="Something Failed!")