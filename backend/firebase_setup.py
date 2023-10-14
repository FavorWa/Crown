import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize the Firebase Admin SDK with the service account JSON file
cred = credentials.Certificate("firebase_credentials.json")
app = firebase_admin.initialize_app(cred)

app = firebase_admin.initialize_app(cred)

db = firestore.client()