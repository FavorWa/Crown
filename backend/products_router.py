from fastapi import APIRouter, HTTPException
from db import get_database
from amazon_to_db import hair_types, product_types
from blogs_router import ids_to_strings

products_router = APIRouter()
db = get_database()

@products_router.get('/{hair_type}/{product_type}')
def get_products(hair_type, product_type):
    if hair_type in hair_types and product_type in product_types:
        query = {"hairType": hair_type, "productType": product_type}
        cursor = db["Products"].find(query).limit(10)
        docs = [doc for doc in cursor]
        ids_to_strings(docs)
        return docs
    
    else:
        raise HTTPException(status_code=400, detail="Malformed API request")