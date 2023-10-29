from fastapi import APIRouter
from secret_values import rainforest_api_key, google_search_api_key, google_search_engine_id
from db import get_database
import requests
import random
from bs4 import BeautifulSoup

digestRouter = APIRouter()
db = get_database()

###############################
#### HELPER FUNCTIONS ########
###############################
def ids_to_strings(items):
    for item in items:
        item["id"] = str(item["_id"])
        del item["_id"]
    return items

def get_user_tags(userId=None):
    return []

################################
########## ROUTES ##############
################################
@digestRouter.get('/general')
def getGeneralDigest():
    thumbnail_infos = [info for info in db["generalDigest"].find()]
    ids_to_strings(thumbnail_infos)
    return thumbnail_infos

@digestRouter.get('/personal')
def getPersonalDigest():

    user_tags = get_user_tags()

    if not user_tags:
        thumbnail_infos = list(db["articles"].find())
        random.shuffle(thumbnail_infos)
    
    else:
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
    
    three_articles = thumbnail_infos[:3]
    ids_to_strings(three_articles)

    return three_articles