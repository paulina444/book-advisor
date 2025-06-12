# Emotion Book Recommender

## Overview
The Emotion Book Recommender is an application designed to help users find book recommendations based on their current feelings. By analyzing the emotions expressed by the user, the application suggests books that align with those emotions, enhancing the reading experience.

## Project Structure
The project is divided into two main parts: the backend and the frontend.

### Backend
- **src/emotion_analyzer.py**: Contains the logic for analyzing emotions from text input using a pre-trained model.
- **src/recommender.py**: Responsible for providing book recommendations based on detected emotions.
- **src/main.py**: The entry point for the backend application, setting up the server and handling requests.
- **requirements.txt**: Lists the dependencies required for the backend application.

### Frontend
- **src/App.js**: The main component that manages the application state and renders child components.
- **src/components/EmotionInput.js**: A component for user input of current feelings.
- **src/components/BookList.js**: Displays a list of book recommendations based on user emotions.
- **src/index.js**: The entry point for the frontend application.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```
   python src/main.py
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```

## Usage
1. Open the frontend application in your web browser.
2. Input your current feelings in the provided text box.
3. Submit the form to receive book recommendations tailored to your emotions.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.