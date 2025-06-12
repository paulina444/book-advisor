# Emotion Book Recommender

## Overview
The Emotion Book Recommender is a web application that allows users to input their current feelings and receive personalized book recommendations based on those emotions. The application leverages natural language processing to analyze user input and match it with suitable book titles.

## Backend

### Directory Structure
- `src/`
  - `emotion_analyzer.py`: Contains the logic for analyzing emotions from text input using a pre-trained model.
  - `recommender.py`: Responsible for providing book recommendations based on detected emotions.
  - `main.py`: Entry point for the backend application, setting up the server and handling requests.

### Requirements
To run the backend application, ensure you have the following dependencies installed:
- pandas
- transformers
- tqdm

You can install the required packages using:
```
pip install -r requirements.txt
```

### Running the Backend
1. Navigate to the `backend` directory.
2. Run the main application:
```
python src/main.py
```
3. The server will start, and you can make requests to analyze emotions and get book recommendations.

## Frontend
The frontend of the application is built using React. It allows users to input their feelings and view book recommendations.

### Directory Structure
- `src/`
  - `App.js`: Main component managing application state.
  - `components/`
    - `EmotionInput.js`: Component for user input of feelings.
    - `BookList.js`: Component for displaying book recommendations.

### Running the Frontend
1. Navigate to the `frontend` directory.
2. Install the required packages:
```
npm install
```
3. Start the frontend application:
```
npm start
```

## Contribution
Feel free to contribute to the project by submitting issues or pull requests. Your feedback and suggestions are welcome!

## License
This project is open-source and available under the MIT License.