from secret_values import rainforest_api_key
from db import get_database
import requests

db = get_database()

def make_search_string(hair_type: str):
    return f'type {hair_type} hair products'

def get_products_from_rainforest_api(hair_type: str):

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

    # make the http GET request to Rainforest API, should get json back
    api_result = requests.get('https://api.rainforestapi.com/request', params)

    json = api_result.json()

    return json["search_results"]

def transform_products(products):
    transformed_products = []
    for product in products:
        try:
            transformed_products.append({
                "title": product["title"],
                "link": product["link"],
                "image": product["image"],
                "price": product["price"]["raw"]
            })
        except KeyError:
            print("An item doesn't have a title, link, image, or price. It has been omitted.")
    
    return transformed_products

def get_products(hair_type):
    collection_names = db.list_collection_names()
    if hair_type not in collection_names:
        products = get_products_from_rainforest_api(hair_type)
        transformed_products = transform_products(products)
        db[hair_type].insert_many(transformed_products)
        return transform_products(transformed_products)
    else:
        print('products from database')
        products = [item for item in db[hair_type].find()]
        for product in products:
            product["id"] = str(product["_id"])
            del product["_id"]
        return products

USE_DATABASE = True
def update_database():
    hair_types = ["2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"]
    for hair_type in hair_types:

        # drop database
        db[hair_type].drop()

        products = get_products_from_rainforest_api(hair_type)
        transformed_products = transform_products(products)

        # re initialize it
        db[hair_type].insert_many(transformed_products)

if __name__ == '__main__':
    update_database()