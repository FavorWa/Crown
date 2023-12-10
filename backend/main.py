from fastapi import FastAPI, HTTPException, File, UploadFile, Query
from pydantic import BaseModel
from db import get_database
from products_router import products_router
from signUp import router as sign_up_router
from login import router as log_in_router
from blogs_router import blogs_router
from user import router as user
# from bookAppointment import router as bookAppointment
from stylist import router as stylist
from dotenv import load_dotenv
from stylists_router import stylists_router
from typing import Optional


load_dotenv()


db = get_database()
app = FastAPI()
app.include_router(products_router, prefix="/products")
app.include_router(sign_up_router)
app.include_router(log_in_router)
app.include_router(blogs_router, prefix="/blogs")
app.include_router(user)
# app.include_router(bookAppointment)
app.include_router(stylist)
app.include_router(stylists_router, prefix="/stylists")


@app.get("/")
async def root():
    return {"message": "Hello World"}

hairQuizQuestionCollection = db["hairQuestions"]


@app.get("/healthcheck", status_code=200)
def healthceck():
    return "server is live!"


@app.get("/questions")
async def get_hair_questions():
    questions = list(hairQuizQuestionCollection.find({}, {"_id": 0}))
    return questions


class Response(BaseModel):
    userEmail: str
    answers: list


userCollection = db["UserInfo"]
responsesCollection = db["user_responses"]


@app.post("/submit_response")
async def submit_responses(responses: Response):
    try:
        # Store the submitted responses in MongoDB

        response_id = await responsesCollection.insert_one(dict(responses))
        return {"message": "Responses submitted successfully",
                "response_id": str(response_id.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class Hair_Attributes(BaseModel):
    curlPattern: str
    curlDegree: str
    thickness: str


hair_descriptions = {
    "2A": "Type 2A hair is characterized by loose, S-shaped waves that are relatively fine and flat against the head. It tends to be prone to frizz.",
    "2B": "Type 2B hair features more defined S-shaped waves that are thicker and have a bit more volume than 2A hair. It's also prone to frizz and can be straightened more easily.",
    "2C": "Type 2C hair has well-defined, thick waves with some curl at the ends. It can be prone to frizz and requires more styling effort to maintain the waves.",
    "3A": "Type 3A hair consists of large, loose curls that resemble the circumference of a sidewalk chalk. It tends to be naturally shiny and has more bounce.",
    "3B": "Type 3B hair features smaller, more tightly wound curls, similar in size to a marker. It's prone to frizz and benefits from regular conditioning.",
    "3C": "Type 3C hair consists of tight corkscrew curls, about the circumference of a pencil or straw. It's prone to dryness and requires proper moisture and care.",
    "4A": "Type 4A hair has tightly coiled, S-shaped curls with a small diameter. It's fragile, prone to dryness, and requires regular deep conditioning.",
    "4B": "Type 4B hair features a more zig-zag pattern with sharp angles. It's highly coiled and can appear fragile, requiring intense moisture and gentle handling.",
    "4C": "Tightly coiled hair is also known as just coily hair, Afro-textured hair, or kinky hair. Type 4 hair is naturally dry (so don’t worry!) and spongy in texture. It can either be soft and fine or coarse and wiry. Strands form very tight small, curls with a zig-zag motion from the roots. Type 4 hair is also prone to shrinkage. You have Type 4C hair, which is normally more fragile and has a strong zig-zag pattern."
}


class Email(BaseModel):
    userEmail: str


def updateHairType(user_email: str, hair_type: str):
    try:
        # Check if the existing hairType is the same as the calculated hair_type
        existing_user = userCollection.find_one({"email": user_email})
        if existing_user and existing_user.get("hairType") == hair_type:
            print(f"Hair type for {user_email} is already up to date.")
            return

        result = userCollection.update_one(
            {"email": user_email},
            {"$set": {"hairType": hair_type}}
        )

        print(f"Update Result: {result.raw_result}")
        print(f"Modified Count: {result.modified_count}")

        if result.modified_count == 0:
            raise HTTPException(
                status_code=404, detail=f"User with email {user_email} not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/getHairType")
async def getHairType(userEmail: Email):
    # Initialize curlPattern and curlDegree
    curlPattern = ""
    curlDegree = ""

    # Retrieve answers from the database
    answers = responsesCollection.find_one({"userEmail": userEmail.userEmail})

    if answers:
        # Get the 'answers' array with a default empty list
        answers_array = answers.get("answers", [])

        if len(answers_array) >= 2:  # Check if the array has at least two elements
            curlPattern = answers_array[0]
            curlDegree = answers_array[1]

    # Check the values of curlPattern and curlDegree and update hair_type accordingly
    if curlPattern == "Wavy":
        hair_type = "2"
    elif curlPattern == "Curly":
        hair_type = "3"
    elif curlPattern == "Coily":
        hair_type = "4"
    else:
        raise HTTPException(status_code=400, detail="Invalid curl pattern")

    if curlDegree == "Wide":
        hair_type += "A"
    elif curlDegree == "Medium":
        hair_type += "B"
    elif curlDegree == "Tight":
        hair_type += "C"
    else:
        raise HTTPException(status_code=400, detail="Invalid curl degree")

    print(hair_type)
    updateHairType(userEmail.userEmail, hair_type)
    return {"hairType": hair_type, "hairDescription": hair_descriptions[hair_type]}


# Function for uploading the images of the inspos

hairInspo = db["hairInspo"]


@app.get("/get_images")
async def get_images(search_term: Optional[str] = Query(None, title="Search Term")):
    try:
        # Define the keywords to filter images
        keywords = ["hair", "haircuts", "hairstyle", "braids", "wigs", "locs", "dreads", 'wig', 'hairstyles']

        # Define the search criteria
        search_criteria = {"$and": []}

        # Add conditions for each field
        for key in ["grid_title", "description", "title", "grid_description", "board.name"]:
            search_criteria["$and"].append(
                {key: {"$regex": "|".join(keywords), "$options": "i"}})

        if search_term:
            search_criteria["$and"].append(
                {"$or": [
                    {"grid_title": {"$regex": search_term, "$options": "i"}},
                    {"description": {"$regex": search_term, "$options": "i"}},
                    {"grid_description": {"$regex": search_term, "$options": "i"}},
                    {"title": {"$regex": search_term, "$options": "i"}},
                    {"board.name": {"$regex": search_term, "$options": "i"}},
                ]}
            )

        # Retrieve image URLs from MongoDB
        images = list(hairInspo.find(search_criteria, {"_id": 0, "image.url": 1}))

        # Extract image URLs
        image_urls = [item["image"]["url"] for item in images]

        return {"image_urls": image_urls}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
