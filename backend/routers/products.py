from fastapi import APIRouter
from backend.secrets import rainforest_api_key
import requests
import json

router = APIRouter()

def make_search_string(hair_type: str):
    return f'type {hair_type} hair products'

async def get_products_from_rainforest_api(hair_type: str):

    # set up the request parameters
    params = {
    'api_key': rainforest_api_key,
    'type': 'search',
    'amazon_domain': 'amazon.com',
    'search_term': make_search_string(hair_type),
    'sort_by': 'average_review',
    'page': '1',
    'output': 'json'
    }

    # make the http GET request to Rainforest API
    api_result = await requests.get('https://api.rainforestapi.com/request', params)

    # print the JSON response from Rainforest API
    data = json.dumps(api_result.json())
    return data["search_results"]

def transform_products(products):
    transformed_products = []
    for product in products:
        transformed_products.append({
            "title": products["title"],
            "link": products["link"],
            "image": products["image"],
            "price": products["price"]["raw"]
        })
    
    return json.dumps(transformed_products, indent=4)

def get_products(hair_type):
    products = get_products_from_rainforest_api(hair_type)
    return transform_products(products)

@router.get('/2a')
async def get_2a_hair_products():
    return get_products("2a")

@router.get('/2b')
async def get_2b_hair_products():
    return get_products("2b")
    
@router.get('/2c')
async def get_2b_hair_products():
    return get_products("2c")

@router.get('/3a')
async def get_2b_hair_products():
    return get_products("3a")

@router.get('/3b')
async def get_2b_hair_products():
    return get_products("3b")

@router.get('/3c')
async def get_2b_hair_products():
    return get_products("3c")

@router.get('/4a')
async def get_2b_hair_products():
    return get_products("4a")

@router.get('/4b')
async def get_2b_hair_products():
    return get_products("4b")

@router.get('/4c')
async def get_2b_hair_products():
    return get_products("4c")