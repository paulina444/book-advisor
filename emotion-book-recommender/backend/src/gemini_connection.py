import os
from dotenv import load_dotenv
import google.generativeai as genai

# Załaduj zmienne środowiskowe z pliku .env
load_dotenv()

# Pobierz klucz API z .env
api_key = os.getenv("GEMINI_API_KEY")

# Skonfiguruj klienta Gemini (tylko raz)
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")  # lub "gemini-1.5-pro"

def ask_gemini(prompt):
    """Zwraca odpowiedź Gemini na podany prompt."""
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {e}"