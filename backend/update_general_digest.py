from fastapi import APIRouter
from db import get_database
import requests
import random
from bs4 import BeautifulSoup

digestRouter = APIRouter()
db = get_database()

def make_article(title: str, snippet: str, link: str, tags: [str], image: str, minutes: int):
    return {
        "title": title,
        "snippet": snippet,
        "link": link,
        "tags": tags,
        "image": image,
        "minutes": minutes
    }


if __name__ == '__main__':

    db["generalDigest"].insert_many(
        [
            {
                "title": "Short Fall Hairstyles for Curly Hair",
                "link": "https://www.ouidad.com/blogs/curl-talk/short-hairstyles-for-fall",
                "image": "https://www.melissaerial.com/wp-content/uploads/2020/07/fall-hairstyles-for-black-women-1.jpg",
                "snippet": "Turn a new leaf with these looks",
                "minutes": 5
            }, 
            {
                "title": "Don't know how to wear your hair at the gym? We got you",
                "link": "https://www.thecurlstory.com/workout-hairstyles-for-curly-hair/",
                "snippet": "Work out without worrying about your hair getting in the way",
                "image": "https://hips.hearstapps.com/hmg-prod/images/gym-hairstyles-1543952708.jpg",
                "minutes": 7
            },
            {
                "title":"Natural Hair: Starter's Guide",
                "link": "https://naturalhair.org/blogs/news/your-complete-guide-to-transitioning-to-natural-hair",
                "image": "https://i.pinimg.com/564x/77/49/4e/77494e645e79d8d974f16296b9c6dd61.jpg",
                "snippet": "Want to transition to natural hair but don't know where to start? This article offers tips and tricks on how to take care of your hair and build a healthy daily routine",
                "minutes": 10
            }
        ]
    )