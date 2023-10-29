from fastapi import APIRouter
from secret_values import rainforest_api_key, google_search_api_key, google_search_engine_id
from db import get_database
import requests
import random
from bs4 import BeautifulSoup

digestRouter = APIRouter()
db = get_database()

def get_google_results(query : str, tags: [str], num_of_results: int, start: int):
    query += " -youtube.com -pinterest.com -tiktok.com"
    valid_query = query.replace(" ", "%20")
    url = f'https://www.googleapis.com/customsearch/v1?key={google_search_api_key}&cx={google_search_engine_id}&q={valid_query}&num={num_of_results}&start={start}'
    data = requests.get(url).json()
    results = data.get("items")
    filtered_results = [{"link": result["link"], "title": result["title"], "snippet": result["snippet"]} for result in results if result["link"] and result["title"] and result["snippet"]]
    for result in filtered_results:
        result["tags"] = tags
    return filtered_results

def add_readtime_to_results(results):
    for result in results:
        response = requests.get(result["link"])
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            article_content = soup.get_text()

            word_count = len(article_content.split())

            # Calculate estimated reading time (assuming 225 words per minute)
            reading_speed = 225  # words per minute
            estimated_reading_time = word_count / reading_speed
            result["minutes"] = estimated_reading_time
        else:
            result["minutes"] = None
            print(f"Failed to retrieve the article page to calculate readtime - (Status code: {response.status_code}).")

def add_picture_to_results(results):
    for result in results:
        response = requests.get(result["link"])
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            cover_image = soup.find('img')
            if cover_image:
                try:
                    result["image"] = cover_image['src']
                except:
                    attributes = cover_image.attrs
                    for attribute, value in attributes.items():
                        if 'src' in attribute:
                            result["image"] = value
            else:
                result["image"] = None
        else:
            result["image"] = None
            print(f"Failed to retrieve the article page for cover picture - (Status code: {response.status_code}).")

def save_results_to_db(results):
    db["articles"].insert_many(results)

def pipeline(query: str, tags: [str], num_of_results : int, start: int):
    results = get_google_results(query=query, tags=tags, num_of_results=num_of_results, start=start)
    add_readtime_to_results(results)
    add_picture_to_results(results)
    save_results_to_db(results)

if __name__ == '__main__':
    num_of_results = 5
    start = 1
    pipeline(query="2A hair type morning routines", tags=["2A", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="2B hair type morning routines", tags=["2B", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="2C hair type morning routines", tags=["2C", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="3A hair type morning routines", tags=["3A", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="3B hair type morning routines", tags=["3B", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="3C hair type morning routines", tags=["3C", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="4A hair type morning routines", tags=["4A", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="4B hair type morning routines", tags=["4B", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="4C hair type morning routines", tags=["4C", "morning", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="2A hair type night routines", tags=["2A", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="2B hair type night routines", tags=["2B", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="2C hair type night routines", tags=["2C", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="3A hair type night routines", tags=["3A", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="3B hair type night routines", tags=["3B", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="3C hair type night routines", tags=["3C", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="4A hair type night routines", tags=["4A", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="4B hair type night routines", tags=["4B", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="4C hair type night routines", tags=["4C", "night", "routine"], num_of_results=num_of_results, start=start)
    pipeline(query="fall protective hair styles", tags=["fall", "protective"], num_of_results=num_of_results, start=start)
    pipeline(query="protective styles guide", tags=["guide", "protective"], num_of_results=num_of_results, start=start)