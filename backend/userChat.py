from db import get_database
from fastapi.responses import JSONResponse
from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from datetime import datetime
from bson import ObjectId
from uuid import uuid4

load_dotenv()

mongodb_uri = os.getenv("mongodb_uri")

db = get_database()
router = APIRouter()

# MongoDB connection
CONNECTION_STRING = mongodb_uri  
client = MongoClient(CONNECTION_STRING)
db = client['crown']  
stylist_collection = db['StylistProfiles']  
user_collection = db['UserInfo']
Conversation = db['Conversation']

class Message(BaseModel):
    currentUser: str
    otherUser: str
    text: str

@router.post('/send_message')
async def send_message(message: Message):
    try:
        timestamp = datetime.utcnow()  # Get the current timestamp in UTC

        # Check if the conversation exists
        conversation_query = {
            "$or": [
                {"participants": [message.currentUser, message.otherUser]},
                {"participants": [message.otherUser, message.currentUser]},
            ]
        }
        existing_conversation = Conversation.find_one(conversation_query)

        if existing_conversation:
            # Conversation exists, update it
            Conversation.update_one(
                {"_id": existing_conversation["_id"]},
                {
                    "$push": {
                        "messages": {
                            "_id": ObjectId(),  # Generate a new ObjectId
                            "sender": message.currentUser,
                            "text": message.text,
                            "timestamp": timestamp,
                        }
                    }
                }
            )
        else:
            # Conversation doesn't exist, create a new one
            new_conversation = {
                "participants": [message.currentUser, message.otherUser],
                "messages": [
                    {
                        "_id": ObjectId(),  # Generate a new ObjectId
                        "sender": message.currentUser,
                        "text": message.text,
                        "timestamp": timestamp,
                    }
                ],
            }
            Conversation.insert_one(new_conversation)

        # You can also print the message for debugging purposes
        print(f"Message received: currentUser {message.currentUser} to another User {message.otherUser}: {message.text}")

        return {"status": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/fetch_conversation')
def fetch_conversation(participant_1: str, participant_2: str):
    try:
        # Check if the conversation exists
        conversation_query = {
            "$or": [
                {"participants": [participant_1, participant_2]},
                {"participants": [participant_2, participant_1]},
            ]
        }
        conversation = Conversation.find_one(conversation_query)

        if conversation:
            # Convert ObjectId to string for each message
            for message in conversation["messages"]:
                message['_id'] = str(message['_id'])
            # Sort messages by timestamp in ascending order
            sorted_messages = sorted(conversation['messages'], key=lambda x: x['timestamp'])

            return {
                "_id": str(conversation["_id"]),
                "participants": conversation["participants"],
                "messages": sorted_messages,
            }
        else:
            return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get('/check_message')
def check_message(userEmail: str):
    try:
        # Find all conversations where the specified userEmail is a participant
        conversation_query = {"participants": userEmail}
        conversations = Conversation.find(conversation_query)

        result = set()

        for conversation in conversations:
            # Extract participants from each conversation
            participants = conversation["participants"]
            
            # Ensure uniqueness of participant pairs
            result.add(tuple(participants))

        # Convert set of tuples to a list
        unique_participant_pairs = [list(pair) for pair in result]

        return {"participant_pairs": unique_participant_pairs}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))