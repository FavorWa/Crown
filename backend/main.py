from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .database import get_database

db = get_database()
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

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

@app.post("/getHairType")
async def getHairType(hair_attributes: Hair_Attributes):
    hair_type = ""
    hair_dict = hair_attributes.model_dump()

    if hair_dict["curlPattern"] == "Wavy":
        hair_type += "2"
    elif hair_dict["curPattern"] == "Curly":
        hair_type += "3"
    elif hair_dict["curlPattern"] == "Coily":
        hair_type += "4"
    else:
        raise HTTPException(status_code=400, detail="Invalid curl pattern")

    if hair_dict["curlDegree"] == "Wide":
        hair_type += "A"
    elif hair_dict["curlDegree"] == "Medium":
        hair_type += "B"
    elif hair_dict["curlDegree"] == "Tight":
        hair_type += "C"
    else:
        raise HTTPException(status_code=400, detail="Invalid curl degree")
    
    return {"hairType": hair_type, "description": hair_descriptions[hair_type]}