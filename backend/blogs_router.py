from fastapi import APIRouter, Query
from db import get_database
import random
from pydantic import BaseModel
from typing import Annotated

blogs_router = APIRouter()
db = get_database()


##############################
########## MODELS ############
##############################
class User(BaseModel):
    email: str

class Comment(User):
    text: str

class Sections(BaseModel):
    sections: list[str]

###############################
#### HELPER FUNCTIONS ########
###############################
def ids_to_strings(items):
    for item in items:
        item["_id"] = str(item["_id"])
    return items

def get_user_tags(userId=None):
    return []

def get_likes(article_id):
    article_likes = db["articleLikes"].find({"articleId": article_id})
    likes = [like for like in article_likes]
    return likes


def get_comments(article_id):
    article_comments = db["articleComments"].find({"articleId": article_id})
    comments = [like for like in article_comments]
    return comments

################################
########## ROUTES ##############
################################

@blogs_router.get('/sample')
def get_sample():
    collection = db["Blogs"]
    sample_size = 5
    total_documents = collection.count_documents({})
    random_indices = random.sample(range(total_documents), sample_size)
    random_documents = [collection.find_one(skip=index) for index in random_indices]
    ids_to_strings(random_documents)
    return random_documents


@blogs_router.get('/sections')
def get_sections(sections: Annotated[list[str], Query()]):
    collection = db["Blogs"]
    blogs = []
    for section in sections:
        cursor = collection.find({"tags": section})
        docs = [doc for doc in cursor]
        ids_to_strings(docs)
        blogs += docs
    print(blogs)
    return blogs
    
@blogs_router.get('/{article_id}/likes')
def get_article_likes(article_id):
    likes = get_likes(article_id)
    ids_to_strings(likes)
    return likes 

@blogs_router.get('/{article_id}/comments')
def get_article_likes(article_id):
    comments = get_comments(article_id)
    ids_to_strings(comments)
    print(comments)
    return comments

@blogs_router.post('/{article_id}/add_like')
def add_like(article_id, user: User):
    doc_to_insert = {"articleId": article_id, "email": user.email}
    existing_doc = db["articleLikes"].find_one(doc_to_insert)
    if existing_doc is None:
        db["articleLikes"].insert_one(doc_to_insert)
        return {"message": f'{user.email} liked article {article_id}'}
    else:
        return {"message": f'{user.email} has already liked article {article_id}'}
    
@blogs_router.post('/{article_id}/delete_like')
def delete_like(article_id, user: User):
    doc_to_delete = {"articleId": article_id, "email": user.email}
    existing_doc = db["articleLikes"].find_one(doc_to_delete)
    if existing_doc is None:
        return {"message": f'{user.email} already unliked or never liked article {article_id}'}
    else:
        db["articleLikes"].delete_one(doc_to_delete)
        return {"message": f'{user.email} has unliked article {article_id}'}
    
@blogs_router.post('/{article_id}/toggle_like')
def toggle_like(article_id, user: User):
    doc = {"articleId": article_id, "email": user.email}
    existing_doc = db["articleLikes"].find_one(doc)

    if existing_doc is None:
        add_like(article_id, user)
    else:
        delete_like(article_id, user)

@blogs_router.post('/{article_id}/comment')
def add_comment(article_id, comment: Comment):
    print(comment)
    doc_to_insert = {"articleId": article_id, "email": comment.email, "text": comment.text}
    existing_doc = db["articleComments"].find_one(doc_to_insert)
    if existing_doc is None:
        db["articleComments"].insert_one(doc_to_insert)
        return {"message": f'{comment.email} commented on article {article_id}'}
    else:
        return {"message": f'{comment.email} has already commented this on article {article_id}. Duplicate comment!'}