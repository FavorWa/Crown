from db import get_database
from fastapi.responses import JSONResponse
from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
import os
from dotenv import load_dotenv


load_dotenv()

mongodb_uri = os.getenv("mongodb_uri")
yelp_api_key = os.getenv("yelp_api_key")

db = get_database()
router = APIRouter()

# MongoDB connection
CONNECTION_STRING = mongodb_uri  
client = MongoClient(CONNECTION_STRING)
db = client['crown']  # Replace 'crown' with your database name
users_collection = db['StylistProfiles']  # Replace 'UserInfo' with your collection name

class email(BaseModel):
    email: str

@router.post('/get_stylist_service')
async def get_stylist_service(input: email):
    stored_user = users_collection.find_one({"email": input.email})
    if stored_user:
        services = stored_user.get('services', [])

        service_names = []
        service_sizes = []
        service_prices = []

        for service in services:
            service_names.append(service[0])
            service_sizes.append(service[1])
            service_prices.append(service[2])

        return {
            "message": "Services retrieved successfully.",
            "service_names": service_names,
            "service_sizes": service_sizes,
            "service_prices": service_prices
        }
    else:
        raise HTTPException(status_code=404, detail="Stylist not found.")


import base64
import os.path
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from google.auth.exceptions import RefreshError
from google.oauth2.credentials import Credentials
from requests import HTTPError

# If modifying these SCOPES, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

def get_credentials():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json")

    # If there are no (valid) credentials available, let the user log in.
    # if not creds or not creds.valid:
    #     if creds and creds.expired and creds.refresh_token:
    #         try:
    #             creds.refresh(Request())
    #         except RefreshError as e:
    #             print(f"Error refreshing credentials: {e}")
    #             return None
    #     else:
    #         flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
    #         creds = flow.run_local_server(port=0)

    #     # Save the credentials for the next run
    #     with open("token.json", "w") as token:
    #         token.write(creds.to_json())

    return creds

# Get credentials
credentials = get_credentials()

# If credentials are obtained, proceed to build the Gmail API service
if credentials:
    service = build("gmail", "v1", credentials=credentials)

    # Create a MIMEText message
    message = MIMEText("last testing email!")
    message["to"] = "sjz956230@gmail.com"
    message["subject"] = "Email Subject"
    create_message = {"raw": base64.urlsafe_b64encode(message.as_bytes()).decode()}

    try:
        # Send the email
        sent_message = service.users().messages().send(userId="me", body=create_message).execute()
        print(f"Sent message to {sent_message} Message Id: {sent_message['id']}")
    except HTTPError as error:
        print(f"An error occurred: {error}")
    

