from db import get_database

db = get_database()

hairQuestions = [
    {
        "category": "Hair Type",
        "question": "Which most closely resembles your hair type?",
        "description": "It’s okay if it’s not an exact match!",
        "answers": ['Wavy', 'Curly', 'Coily']

    },
    {
        "category": "Hair Type",
        "question": "How tightly wounded are your curls naturally(based on the previous question)",
        "description": "Would you say you are on the tighter or wider (looser?) side of wavy?",
        "answers": ['Wide', 'Medium', 'Tight']
    },
    {
        "category": "Hair Type",
        "question": "What is the thickness of your hair?",
        "description": "Just the thickness of a single strand.",
        "answers": ["Fine", "Medium", "Thick"]
    },
    {
        "category": "Hair Treatment",
        "question": "How has your hair been treated in the past 3 months?",
        "description": "Select whichever is more recent",
        "answers": ["Exposure to high heat", "Color Treated", "Chemically Treated", "Protectively Styled", "None of the Above"]
    },
    {
        "category": "Current Routine",
        "question": "How often is your wash day routine?",
        "description": "There is no right or wrong answer!",
        "answers": ["Everyday", "2-4 times a week", "Once a week", "Once every two weeks or more"]
    },
    {
        "category": "Current Routine",
        "question": "How would you describe your scalp?",
        "description": "There is no right or wrong answer!",
        "answers": ["Dry", "Sensitive", "Oily", "Flaky", "None of the Above"]
    },
    {
        "category": "Top Concerns",
        "question": "What is the number one concern you have with your curls?",
        "description": "Select the one you experience most often.",
        "answers": ["Dryness", "Frizziness/Humidity", "Damaged/Breakage", "Tangles", "Dullness", "Shrinkage"]
    },
    {
        "category": "Style Goals",
        "question": "What is your ultimate style goal?",
        "description": "It’s okay if you’re not sure or if your goal isn’t listed!",
        "answers": ["SilkPress/Blowout", "Wash 'n Go", "Protective Style", "None of the Above"]
    }
]

hairQuizQuestionCollection = db["hairQuestions"]
hairQuizQuestionCollection = db["hairQuestions"]
for question in hairQuestions:
    hairQuizQuestionCollection.insert_one(question)
