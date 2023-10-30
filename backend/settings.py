from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://fwari:u9h128fa@crowncluster.bpwsyr0.mongodb.net/?retryWrites=true&w=majority"
port = 8000
# Create a new client and connect to the server
client = MongoClient(uri, port)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
