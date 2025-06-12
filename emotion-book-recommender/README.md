### Book Advisor

Book Advisor is an AI-powered web application that recommends books based on your emotional state. Simply describe how you're feeling, and the application will analyze your emotions and suggest books that match your mood.

![Home Page](/emotion-book-recommender/images/home_page.png)
![Emotion](/emotion-book-recommender/images/sadness_book.png)
![Book](/emotion-book-recommender/images/book.png)
![Chat](/emotion-book-recommender/images/chat.png)

## Dataset

This application uses a static dataset that needs to be downloaded separately:

- **Dataset**: [Comprehensive Overview of 52,478 Goodreads Best Books](https://www.kaggle.com/datasets/thedevastator/comprehensive-overview-of-52478-goodreads-best-b)
- **Contents**: Contains information about 52,478 books including titles, authors, descriptions, ratings, and genres

Note: The book recommendations are based on this static dataset. The application does not fetch real-time data.

## Features

- **Emotion-Based Book Recommendations**: Get personalized book recommendations based on your current emotional state
- **Book Details**: View detailed information about each recommended book
- **AI-Powered Q&A**: Ask questions about books and get AI-generated answers
- **Pre-defined Questions**: Quick access to common questions about books
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

### Frontend

- React.js
- React Router
- Axios for API requests
- Lucide React for icons
- CSS for styling

### Backend

- Flask (Python web framework)
- Transformers library for emotion detection
- Google Gemini AI for answering book-related questions
- Pandas for data manipulation

## Development Approach: Vibe Coding with LLMs

This project was developed using the vibe coding approach — a creative and experimental workflow where most of the code was generated using large language models (LLMs) such as ChatGPT and Google Gemini. From backend routes and Flask integration to frontend UI logic in React, LLMs played a key role in accelerating development, solving bugs, and brainstorming ideas.

By leveraging LLMs throughout the development process, I was able to:

- Rapidly prototype new features
- Generate boilerplate code without manual repetition
- Refine components based on natural language prompts
- Quickly explore multiple implementation paths and compare them

This project is not only about books — it's also a reflection of how AI can assist developers in real-time coding workflows.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- pip (Python package manager)
