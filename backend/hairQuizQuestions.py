from db import get_database

db = get_database()

hairQuestions = [
    {
        "category": "Hair Type",
        "question": "Which most closely resembles your hair type?",
        "description": "It’s okay if it’s not an exact match!",
        "answers": ['Wavy', 'Curly', 'Coily'],
        "details": ["Think ocean waves before they break-this pattern is womewhere between straight and curly", "Unlike the wavy texture, your hair actually completes full loops-ranging from loose to tight spirals", "Coily hair texture is defined by its tightness forming a corkscrew shape or a zig-zag pattern."]

    },
    {
        "category": "Hair Type",
        "question": "How tightly wounded are your curls naturally(based on the previous question)",
        "description": "Would you say you are on the tighter or wider (looser?) side of wavy?",
        "answers": ['Wide', 'Medium', 'Tight'],
        "details": ["When we says wide, we mean a pattern that's on the looser end of the spectrum", "Not distinctively wide and not distinctively tight- your hair is somewhere in the middle.", "It's wavy hair that's almost curly, curly hair that is almost coily, and coily hair that is very coily."]
    },
    {
        "category": "Hair Type",
        "question": "What is the thickness of your hair?",
        "description": "Just the thickness of a single strand.",
        "answers": ["Fine", "Medium", "Thick"],
        "details": ["You'll barely feel the hair when you rub a single strand between your fingers.", "You'll somewhat feel the hair when you rub a single stranf between your fingers.", "You'll clearly feel the hair when you rub a single strand between your fingers."]
    },
    {
        "category": "Hair Treatment",
        "question": "How has your hair been treated in the past 3 months?",
        "description": "Select whichever is more recent",
        "answers": ["Exposure to high heat", "Color Treated", "Chemically Treated", "Protectively Styled", "None of the Above"],
        "details": ["This could include the use of a hairdryer or a straightener.", "This could include bleach, gloss, permanent or semi-permanent dye.", "This could include a perm, relaxer, or keratin.", "This could include braids, twist-outs, or locs."]
    },
    {
        "category": "Current Routine",
        "question": "How often is your wash day routine?",
        "description": "There is no right or wrong answer!",
        "answers": ["Everyday", "2-4 times a week", "Once a week", "Once every two weeks or more"],
    },
    {
        "category": "Current Routine",
        "question": "How would you describe your scalp?",
        "description": "There is no right or wrong answer!",
        "answers": ["Dry", "Sensitive", "Oily", "Flaky", "None of the Above"],
        "details": ["You'll notice your scalp may feel a bit tight or irritated.", "Hair sticking together could be an indication of an oily scalp.", "A common side-effect of a sensitive scalp is itchiness or just general discomfort.", "Look at the roots of your hair-if you see dry skin building up, that's a flaky scalp.", "Your scalp feels nice and healthy with none of the issues listed."]
    },
    {
        "category": "Top Concerns",
        "question": "What is the number one concern you have with your curls?",
        "description": "Select the one you experience most often.",
        "answers": ["Dryness", "Frizziness/Humidity", "Damaged/Breakage", "Tangles", "Dullness", "Shrinkage"],
        "details": ["You may be noticing your hair has dandruff or a straw-like, uncomfortable feel to it.", 'You may have individual hairs "going rogue" against your hair pattern, creating a fuzzy texture.', "Often a result of harsh chemical treatment, your hair feels weak and easily breaks.", "Your curls get brunched up and form knots that you'll especially notice while brushing/combing.", "Your hair is losing its radiance, appearing more muted than it should.", " Your curls feel and appear unnaturally compact, shortened in length."]
    },
    {
        "category": "Style Goals",
        "question": "What is your ultimate style goal?",
        "description": "It’s okay if you’re not sure or if your goal isn’t listed!",
        "answers": ["SilkPress/Blowout", "Wash 'n Go", "Protective Style", "None of the Above"]
    }
]

hairQuizQuestionCollection = db["hairQuestions"]
for question in hairQuestions:
    hairQuizQuestionCollection.insert_one(question)
