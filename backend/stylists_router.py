from db import get_database
from fastapi import APIRouter
from dotenv import load_dotenv
from bson import ObjectId
db = get_database()

stylists_router = APIRouter()

def ids_to_strings(items):
    for item in items:
        item["_id"] = str(item["_id"])
    return items

@stylists_router.get('/inhouse')
def get_inhouse_stylists():
    stylists = db["StylistProfiles"].find({})
    stylists = [stylist for stylist in stylists]
    ids_to_strings(stylists)
    return stylists

@stylists_router.get('/inhouse/{id}')
def get_inhouse_stylist(id):
    stylist = db["StylistProfiles"].find_one({"_id": ObjectId(id)})
    print(stylist)
    stylist["_id"] = str(stylist["_id"])
    return stylist