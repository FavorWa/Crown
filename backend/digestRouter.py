from fastapi import APIRouter
from secret_values import rainforest_api_key
from database import get_database
import requests

digestRouter = APIRouter()
db = get_database()

def ids_to_strings(items):
    for item in items:
        item["id"] = str(item["_id"])
        del item["_id"]
    return items

def get_user_tags(userId):
    return []

@digestRouter.get('/general')
def getGeneralDigest():
    thumbnail_infos = [info for info in db["generalDigest"]]
    ids_to_strings(thumbnail_infos)
    return thumbnail_infos

@digestRouter.get('/personal')
def getPersonalDigest():

    user_tags = get_user_tags()

    # Define the aggregation pipeline
    pipeline = [
        {
            "$match": {
                "tags": {
                    "$in": user_tags
                }
            }
        },
        {
            "$addFields": {
                "matchingTags": {
                    "$size": {
                        "$setIntersection": ["$tags", user_tags]
                    }
                }
            }
        },
        {
            "$sort": {
                "matchingTags": -1
            }
        }
    ]

    # Execute the aggregation query
    thumbnail_infos = list(db["articles"].aggregate(pipeline))
    ids_to_strings(thumbnail_infos)

    return thumbnail_infos
