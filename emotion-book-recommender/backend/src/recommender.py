import pandas as pd

# Load the dataset containing book information
books_df = pd.read_csv("books_with_emotions.csv")  # Ensure this file contains book titles, authors, and associated emotions

# Function to recommend books based on user emotions
def recommend_books(emotion, num_recommendations=5):
    # Filter books that match the user's emotion
    recommended_books = books_df[books_df['dominant_emotion'] == emotion]
    
    # If there are not enough recommendations, return as many as possible
    if len(recommended_books) < num_recommendations:
        return recommended_books.sample(len(recommended_books)).to_dict(orient='records')
    
    # Randomly sample the specified number of recommendations
    return recommended_books.sample(num_recommendations).to_dict(orient='records')