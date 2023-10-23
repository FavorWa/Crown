from fastapi import APIRouter
from pymongo import MongoClient
from pydantic import BaseModel
from secret_values import mongodb_uri

router = APIRouter()

# MongoDB connection
CONNECTION_STRING = mongodb_uri  
client = MongoClient(CONNECTION_STRING)
db = client['crown']  # Replace 'crown' with your database name
users_collection = db['UserInfo']  # Replace 'UserInfo' with your collection name

# Create a unique index on the 'email' field
users_collection.create_index("email", unique=True)


class User(BaseModel):
    name: str
    email: str
    password: str

@router.post('/sign_up')
async def sign_up(user: User):
    print("Hello")
    user_data = {
        "name": user.name,
        "email": user.email,
        "password": user.password
    }
    users_collection.insert_one(user_data)

    return {"message": "Hello World"}

@router.get('/test')
async def test():
    return {"message": "test"}


# def sign_up(name, email, password):
#     user_data = {
#         "name": name,
#         "email": email,
#         "password": password
#     }
#     result = users_collection.insert_one(user_data)
#     return result.inserted_id


# Example usage
# if __name__ == "__main__":
#     name = "John Doe"
#     email = "johndoe@1222223.com"
#     password = "examplepassword"
#     result_id = sign_up(name, email, password)
#     print(f"User signed up successfully with id: {result_id}")