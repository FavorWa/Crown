from db import get_database


db = get_database()

hairQuestions = [
    {
        "category": "Hair Type",
        "categoryDetail": "Let's figure out what's right for you!",
        "question": "Which most closely resembles your hair type?",
        "description": "It’s okay if it’s not an exact match!",
        "answers": ['Wavy', 'Curly', 'Coily'],
        "details": ["Think ocean waves before they break-this pattern is somewhere between straight and curly.", "Unlike the wavy texture, your hair actually completes full loops-ranging from loose to tight spirals.", "Coily hair texture is defined by its tightness forming a corkscrew shape or a zig-zag pattern."],
        "image": ['https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/WavyPhoto.png?alt=media&token=07a99324-cf05-4308-8fb0-e4ba80239b7e', 'https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/CurlyPhoto.png?alt=media&token=de1c0743-7c4a-48ad-b39e-17ee57052bb6', 'https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/CoilyPhoto.png?alt=media&token=74c38bf0-8a48-4a69-a39c-be59d4a27c73'],
    },
    {
        "category": "Hair Type",
        "categoryDetail": "Let's figure out what's right for you!",
        "question": "How tightly wounded are your curls naturally?",
        "description": "Would you say you are on the tighter or wider side of wavy?",
        "answers": ['Wide', 'Medium', 'Tight'],
        "details": ["When we says wide, we mean a pattern that's on the looser end of the spectrum.", "Not distinctively wide and not distinctively tight- your hair is somewhere in the middle.", "It's wavy hair that's almost curly, curly hair that is almost coily, and coily hair that is very coily."],
        "image": ['https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/widePhoto.png?alt=media&token=984a6ece-a527-4046-a977-1d9243c72687', 'https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/mediumPhoto.png?alt=media&token=5f105b6a-add7-4df3-843f-686daaa4f623', 'https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/tightPhoto.png?alt=media&token=1b4010b1-bc4d-4d87-bd79-5da94d37c8cf'],
    },
    {
        "category": "Hair Type",
        "categoryDetail": "Let's figure out what's right for you!",
        "question": "What is the thickness of your hair?",
        "description": "Just the thickness of a single strand.",
        "answers": ["Fine", "Medium", "Thick"],
        "details": ["You'll barely feel the hair when you rub a single strand between your fingers.", "You'll somewhat feel the hair when you rub a single stranf between your fingers.", "You'll clearly feel the hair when you rub a single strand between your fingers."],
        "image": ['https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/FinePhoto.png?alt=media&token=52b75250-e971-417c-b6fb-915f3c696b39', 'https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/mediumThickPhoto.png?alt=media&token=5a6d6803-a4b5-47b3-bc0f-372e33ba1ec3', 'https://firebasestorage.googleapis.com/v0/b/safesteps-6a1bb.appspot.com/o/thickPhoto.png?alt=media&token=3f67abf4-fb32-499b-b60e-3e33ae7c9bd5'],
    },
    {
        "category": "Hair Treatment",
        "categoryDetail": "Knowing about your most recent hair treatment will be useful for our analysis.",
        "question": "How has your hair been treated in the past 3 months?",
        "description": "Select whichever is more recent.",
        "answers": ["Exposure to high heat", "Color Treated", "Chemically Treated", "Protectively Styled", "None of the Above"],
        "details": ["This could include the use of a hairdryer or a straightener.", "This could include bleach, gloss, permanent or semi-permanent dye.", "This could include a perm, relaxer, or keratin.", "This could include braids, twist-outs, or locs."]
    },
    {
        "category": "Current Routine",
        "categoryDetail": "When it comes to your hair, your routine is perhaps the most important part.",
        "question": "How often is your wash day routine?",
        "description": "There is no right or wrong answer!",
        "answers": ["Everyday", "2-4 times a week", "Once a week", "Once every two weeks or more"],
    },
    {
        "category": "Current Routine",
        "categoryDetail": "When it comes to your hair, your routine is perhaps the most important part.",
        "question": "How would you describe your scalp?",
        "description": "There is no right or wrong answer!",
        "answers": ["Dry", "Sensitive", "Oily", "Flaky", "None of the Above"],
        "details": ["You'll notice your scalp may feel a bit tight or irritated.", "Hair sticking together could be an indication of an oily scalp.", "A common side-effect of a sensitive scalp is itchiness or just general discomfort.", "Look at the roots of your hair-if you see dry skin building up, that's a flaky scalp.", "Your scalp feels nice and healthy with none of the issues listed."]
    },
    {
        "category": "Top Concerns",
        "categoryDetail": "Tell us what your biggest issue is currently-we'll try to get to the bottom of it.",
        "question": "What is the number one concern you have with your curls?",
        "description": "Select the one you experience most often.",
        "answers": ["Dryness", "Frizziness/Humidity", "Damaged/Breakage", "Tangles", "Dullness", "Shrinkage"],
        "details": ["You may be noticing your hair has dandruff or a straw-like, uncomfortable feel to it.", 'You may have individual hairs "going rogue" against your hair pattern, creating a fuzzy texture.', "Often a result of harsh chemical treatment, your hair feels weak and easily breaks.", "Your curls get brunched up and form knots that you'll especially notice while brushing/combing.", "Your hair is losing its radiance, appearing more muted than it should.", " Your curls feel and appear unnaturally compact, shortened in length."]
    },
    {
        "category": "Style Goals",
        "categoryDetail": "Don't forget this is all about you -- so tell us what you want for your hair!",
        "question": "What is your ultimate style goal?",
        "description": "It’s okay if you’re not sure or if your goal isn’t listed!",
        "answers": ["SilkPress/Blowout", "Wash 'n Go", "Protective Style", "None of the Above"]
    }
]

hairQuizQuestionCollection = db["hairQuestions"]
for question in hairQuestions:
    hairQuizQuestionCollection.insert_one(question)
