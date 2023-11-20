from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from db import get_database
from products_router import products_router
from signUp import router as sign_up_router
from login import router as log_in_router
from blogs_router import blogs_router
from user import router as user
from stylist import router as stylist
from dotenv import load_dotenv
from stylists_router import stylists_router

load_dotenv()


db = get_database()
app = FastAPI()
app.include_router(products_router, prefix="/products")
app.include_router(sign_up_router)
app.include_router(log_in_router)
app.include_router(blogs_router, prefix="/blogs")
app.include_router(user)
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


userCollection = db["Userinfo"]
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
    "4C": "Type 4C hair is the most tightly coiled with minimal definition. It may appear as if there are no distinct curls, making it highly prone to shrinkage and requiring meticulous care and moisture."
}


class Email(BaseModel):
    userEmail: str


@app.post("/getHairType")
async def getHairType(userEmail: Email):
    # print(userEmail)
    answers = responsesCollection.find_one(
        {"userEmail": userEmail.userEmail})

    hair_type = ""
    if answers:
        # Get the 'answers' array with a default empty list
        answers_array = answers.get("answers", [])

        if len(answers_array) >= 2:  # Check if the array has at least two elements
            curlPattern = answers_array[0]
            curlDegree = answers_array[1]
    if curlPattern == "Wavy":
        hair_type += "2"
    elif curlPattern == "Curly":
        hair_type += "3"
    elif curlPattern == "Coily":
        hair_type += "4"
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
    return {"hairType": hair_type, "hairDescription": hair_descriptions[hair_type]}
