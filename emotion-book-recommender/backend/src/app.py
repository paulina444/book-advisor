from flask import Flask, json, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from transformers import pipeline
import os
from gemini_connection import ask_gemini


app = Flask(__name__)
CORS(app)

# Wczytaj dane i model
if os.path.exists("books_with_emotions.csv"):
    df = pd.read_csv("books_with_emotions.csv")
else:
    raise Exception("Najpierw uruchom emotion_analyzer.py, by wygenerować books_with_emotions.csv!")

emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=True
)

def detect_emotion(text):
    try:
        result = emotion_classifier(str(text)[:300])[0]
        top_emotion = max(result, key=lambda x: x['score'])
        return top_emotion['label']
    except Exception:
        return "unknown"

# def recommend_books(emotion):
#     if emotion in df['dominant_emotion'].unique():
#         books = df[df['dominant_emotion'] == emotion].sample(min(10, len(df[df['dominant_emotion'] == emotion])))
#     else:
#         books = df.sample(min(10, len(df)))
#     return books[['title', 'author', 'dominant_emotion']].to_dict(orient='records')

def recommend_books(emotion):
    if emotion in df['dominant_emotion'].unique():
        books = df[df['dominant_emotion'] == emotion].sample(min(10, len(df[df['dominant_emotion'] == emotion])))
    else:
        books = df.sample(min(10, len(df)))
    # Dodaj isbn i coverImg jeśli masz takie kolumny
    return books[['title', 'author', 'dominant_emotion', 'isbn', 'coverImg']].to_dict(orient='records')

@app.route("/book/<title>", methods=["GET"])
def get_book(title):
    def clean(s):
        return s.lower().replace("’", "'").replace("  ", " ").strip()

    title_clean = clean(title)

    book = df[df['title'].apply(lambda t: clean(str(t)) == title_clean)]
    if not book.empty:
        # Zamiana NaN na None
        data = book.iloc[0].replace({np.nan: None}).to_dict()

        # Jeśli pole "description" jest zagnieżdżonym JSON-em jako string
        desc = data.get("description", "")
        if isinstance(desc, str) and desc.strip().startswith("{") and desc.strip().endswith("}"):
            try:
                desc_json = json.loads(desc)
                if "description" in desc_json:
                    data["description"] = desc_json["description"]
            except Exception:
                pass

        return jsonify(data)
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("prompt", "")
    answer = ask_gemini(prompt)
    return jsonify({"response": answer})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_text = data.get("text", "")
    detected_emotion = detect_emotion(user_text)
    books = recommend_books(detected_emotion)
    return jsonify({
        "emotion": detected_emotion,
        "books": books
    })

if __name__ == "__main__":
    app.run() 