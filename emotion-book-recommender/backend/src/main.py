from flask import Flask, request, jsonify
from emotion_analyzer import detect_emotion
from recommender import recommend_books

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_feeling = data.get('feeling', '')
    
    if not user_feeling:
        return jsonify({'error': 'Feeling not provided'}), 400
    
    emotion = detect_emotion(user_feeling)
    recommendations = recommend_books(emotion)
    
    return jsonify({'emotion': emotion, 'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)