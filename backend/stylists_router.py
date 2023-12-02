from db import get_database
from fastapi import APIRouter
from dotenv import load_dotenv
from bson import ObjectId
from pydantic import BaseModel

db = get_database()

class Review(BaseModel):
    reviewer: str
    time: str
    title: str
    content: str
    tags: list[str]
    starsNum: int

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
    stylist["_id"] = str(stylist["_id"])
    return stylist

@stylists_router.get('/inhouse/{id}/reviews')
def get_stylist_reviews(id):
    business = db["StylistProfiles"].find_one({"_id": ObjectId(id)})
    reviews = db["Reviews"].find({"businessName": business["businessName"]})
    reviews = [review for review in reviews]
    ids_to_strings(reviews)
    return reviews

@stylists_router.post('/inhouse/{id}/reviews')
def post_stylist_review(id, review: Review):
    business = db["StylistProfiles"].find_one({"_id": ObjectId(id)})
    document = {
        "reviewer": review.reviewer,
        "time": review.time,
        "title": review.title,
        "content": review.content,
        "tags": review.tags,
        "starsNum": review.starsNum,
        "businessName": business["businessName"]
    }
    db["Reviews"].insert_one(document)
    document = db["Reviews"].find_one(document)
    document["_id"] = str(document["_id"])
    return document


