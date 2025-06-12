import pandas as pd
from transformers import pipeline
from tqdm import tqdm
import os

if os.path.exists("books_with_emotions.csv"):
    print("Wczytuję już przeanalizowane dane...")
    df = pd.read_csv("books_with_emotions.csv")
    emotion_classifier = pipeline(
        "text-classification",
        model="j-hartmann/emotion-english-distilroberta-base",
        return_all_scores=True
    )
else:
    # Wczytaj dane i przypisz emocje
    df = pd.read_csv("dane.csv")
    df = df[df['description'].notna()]
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

    tqdm.pandas()
    print("Analizuję emocje w opisach książek, to może chwilę potrwać...")
    df['dominant_emotion'] = df['description'].progress_apply(detect_emotion)
    df.to_csv("books_with_emotions.csv", index=False)

# Funkcja detect_emotion dostępna globalnie
def detect_emotion(text):
    try:
        result = emotion_classifier(str(text)[:300])[0]
        top_emotion = max(result, key=lambda x: x['score'])
        return top_emotion['label']
    except Exception:
        return "unknown"

def recommend_books(emotion):
    if emotion in df['dominant_emotion'].unique():
        return df[df['dominant_emotion'] == emotion].sample(min(10, len(df[df['dominant_emotion'] == emotion])))
    else:
        return df.sample(min(10, len(df)))

