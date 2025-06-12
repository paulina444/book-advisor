// import React, { useState, useEffect } from "react";import axios from "axios";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
//   useParams
// } from "react-router-dom";
// import './App.css';

// function getCoverUrl(isbn) {
//   if (!isbn || isbn === "null" || isbn === "undefined" || isbn.trim() === "") return null;
//   return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
// }

// // function BookDetails() {
// //   const { title } = useParams();
// //   const [book, setBook] = useState(null);
// //   const [answer, setAnswer] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [activeQuestion, setActiveQuestion] = useState("");

// //   const [prompt, setPrompt] = useState("");
// //   const [chatResponse, setChatResponse] = useState("");
// //   const [chatLoading, setChatLoading] = useState(false);

// //   useEffect(() => {
// //     axios.get(`http://localhost:5000/book/${encodeURIComponent(title)}`)
// //       .then(res => setBook(typeof res.data === "string" ? JSON.parse(res.data) : res.data))
// //       .catch(() => setBook(null));
// //   }, [title]);


// //   const questions = [
// //     { label: "Summerize", prompt: `Summarize what this book is about in English. Title: ${book?.title}. Description: ${book?.description}` },
// //     { label: "Main characters", prompt: `Who is the main character in the book "${book?.title}"?` },
// //     { label: "Main themes", prompt: `What are the main themes or motifs of the book "${book?.title}"?` },
// //     { label: "Is the book part of a series?", prompt: `Is the book "${book?.title}" part of a series? If so, which one?` },
// //     { label: "Target age group", prompt: `What is the target age group for the book "${book?.title}"?` },
// //     { label: "Emotions evoked", prompt: `What emotions does the book "${book?.title}" evoke?` },
// //     { label: "Awards", prompt: `Has the book "${book?.title}" won any awards? If so, which ones?` },
// //     { label: "What are the readers opinions about the book?", prompt: `What are the readers' opinions about the book "${book?.title}"?` },
// //     { label: "Has the book been adapted into a movie or TV series?", prompt: `Has the book "${book?.title}" been adapted into a movie or TV series?` },
// //     { label: "Jakie inne książki są podobne do tej?", prompt: `What other books are similar to "${book?.title}"?` },
// //     { label: "Jaka jest główna fabuła tej książki?", prompt: `What is the main plot of the book "${book?.title}"?` },
// //     { label: "Jakie są najważniejsze wydarzenia w tej książce?", prompt: `What are the most important events in the book "${book?.title}"?` },
// //     { label: "Czy książka ma szczęśliwe zakończenie?", prompt: `Does the book "${book?.title}" have a happy ending?` },
// //     { label: "Jak długo trwa czytanie tej książki (ile ma stron)?", prompt: `How long does it take to read the book "${book?.title}"? How many pages does it have?` },
// //     { label: "W jakim języku została napisana oryginalnie ta książka?", prompt: `In what language was the book "${book?.title}" originally written?` },
// //     { label: "Kto jest autorem i jakie inne książki napisał?", prompt: `Who is the author of "${book?.title}" and what other books has this author written?` }
// //   ];

// //   const handleQuestion = async (prompt, label) => {
// //     setLoading(true);
// //     setAnswer("");
// //     setActiveQuestion(label);
// //     try {
// //       const res = await axios.post("http://localhost:5000/chat", { prompt });
// //       setAnswer(res.data.response);
// //     } catch (e) {
// //       setAnswer("Błąd podczas pobierania odpowiedzi.");
// //     }
// //     setLoading(false);
// //   };

// //   const handleChat = async (e) => {
// //     e.preventDefault();
// //     setChatLoading(true);
// //     setChatResponse("");
// //     // Zbuduj prompt: najpierw kontekst książki, potem pytanie użytkownika
// //     const finalPrompt = `Książka: ${book.title}. Opis: ${book.description}. Pytanie: ${prompt.trim() || "Opowiedz o tej książce."}`;
// //     try {
// //       const res = await axios.post("http://localhost:5000/chat", { prompt: finalPrompt });
// //       setChatResponse(res.data.response);
// //     } catch (err) {
// //       setChatResponse("Błąd połączenia z backendem!");
// //     }
// //     setChatLoading(false);
// //   };

// //   if (!book) return <p>Ładuję dane książki...</p>;

// //   return (
// //   <div>
// //     <h2>{book.title}</h2>
// //     {book.isbn && (
// //       <img
// //         src={getCoverUrl(book.isbn)}
// //         alt={`Okładka książki ${book.title}`}
// //         style={{ maxWidth: 200, marginBottom: 20, borderRadius: 8 }}
// //         onError={e => { e.target.style.display = "none"; }} // ukryj jeśli brak okładki
// //       />
// //     )}
// //     <p><b>Autor:</b> {book.author}</p>
// //     <p><b>Opis:</b> {book.description}</p>
// //     <div style={{ margin: "20px 0" }}>
// //       <b>Wybierz pytanie:</b>
// //       <ul style={{ listStyle: "none", padding: 0 }}>
// //         {questions.map(q => (
// //           <li key={q.label} style={{ margin: "8px 0" }}>
// //             <button
// //               onClick={() => handleQuestion(q.prompt, q.label)}
// //               disabled={loading}
// //               style={{
// //                 background: activeQuestion === q.label ? "#e0e0e0" : "#fff",
// //                 border: "1px solid #ccc",
// //                 borderRadius: 4,
// //                 padding: "6px 12px",
// //                 cursor: "pointer"
// //               }}
// //             >
// //               {q.label}
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //     {answer && (
// //       <div style={{ marginTop: 20 }}>
// //         <b>Odpowiedź Gemini:</b>
// //         <p>{answer}</p>
// //       </div>
// //     )}

// //     <hr style={{ margin: "40px 0" }} />

// //     <h2>Zadaj inne pytanie</h2>
// //   <form onSubmit={handleChat}>
// //     <input
// //       type="text"
// //       value={prompt}
// //       onChange={e => setPrompt(e.target.value)}
// //       style={{ width: "80%" }}
// //       placeholder="Zadaj pytanie o książkę..."
// //     />
// //     <button type="submit" disabled={chatLoading}>
// //       {chatLoading ? "Wysyłanie..." : "Wyślij"}
// //     </button>
// //   </form>
// //     {chatResponse && (
// //       <div style={{ marginTop: 10 }}>
// //         <b>Odpowiedź Gemini:</b> {chatResponse}
// //       </div>
// //     )}
// //   </div>
// // );
// // }

// function BookDetails() {
//   const { title } = useParams();
//   const [book, setBook] = useState(null);
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [activeQuestion, setActiveQuestion] = useState("");
//   const [prompt, setPrompt] = useState("");
//   const [chatResponse, setChatResponse] = useState("");
//   const [chatLoading, setChatLoading] = useState(false);

//   const getCoverUrl = (isbn) => {
//     if (!isbn || isbn === "null" || isbn === "undefined" || isbn.trim() === "") return null;
//     return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/book/${encodeURIComponent(title)}`)
//       .then((res) => setBook(typeof res.data === "string" ? JSON.parse(res.data) : res.data))
//       .catch(() => setBook(null));
//   }, [title]);

//   const questions = [
//     { label: "Summerize", prompt: `Summarize what this book is about in English. Title: ${book?.title}. Description: ${book?.description}` },
//     { label: "Main characters", prompt: `Who is the main character in the book "${book?.title}"?` },
//     { label: "Main themes", prompt: `What are the main themes or motifs of the book "${book?.title}"?` },
//     { label: "Is the book part of a series?", prompt: `Is the book "${book?.title}" part of a series? If so, which one?` },
//     { label: "Target age group", prompt: `What is the target age group for the book "${book?.title}"?` },
//     { label: "Emotions evoked", prompt: `What emotions does the book "${book?.title}" evoke?` },
//     { label: "Awards", prompt: `Has the book "${book?.title}" won any awards? If so, which ones?` },
//     { label: "What are the readers opinions about the book?", prompt: `What are the readers' opinions about the book "${book?.title}"?` },
//     { label: "Has the book been adapted into a movie or TV series?", prompt: `Has the book "${book?.title}" been adapted into a movie or TV series?` },
//     { label: "Jakie inne książki są podobne do tej?", prompt: `What other books are similar to "${book?.title}"?` },
//     { label: "Jaka jest główna fabuła tej książki?", prompt: `What is the main plot of the book "${book?.title}"?` },
//     { label: "Jakie są najważniejsze wydarzenia w tej książce?", prompt: `What are the most important events in the book "${book?.title}"?` },
//     { label: "Czy książka ma szczęśliwe zakończenie?", prompt: `Does the book "${book?.title}" have a happy ending?` },
//     { label: "Jak długo trwa czytanie tej książki (ile ma stron)?", prompt: `How long does it take to read the book "${book?.title}"? How many pages does it have?` },
//     { label: "W jakim języku została napisana oryginalnie ta książka?", prompt: `In what language was the book "${book?.title}" originally written?` },
//     { label: "Kto jest autorem i jakie inne książki napisał?", prompt: `Who is the author of "${book?.title}" and what other books has this author written?` }
//   ];

//   const handleQuestion = async (prompt, label) => {
//     setLoading(true);
//     setAnswer("");
//     setActiveQuestion(label);
//     try {
//       const res = await axios.post("http://localhost:5000/chat", { prompt });
//       setAnswer(res.data.response);
//     } catch {
//       setAnswer("Błąd podczas pobierania odpowiedzi.");
//     }
//     setLoading(false);
//   };

//   const handleChat = async (e) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;
//     setChatLoading(true);
//     setChatResponse("");

//     const finalPrompt = `Książka: ${book.title}. Opis: ${book.description}. Pytanie: ${prompt.trim()}`;
//     try {
//       const res = await axios.post("http://localhost:5000/chat", { prompt: finalPrompt });
//       setChatResponse(res.data.response);
//     } catch {
//       setChatResponse("Błąd połączenia z backendem!");
//     }
//     setChatLoading(false);
//   };

//   if (!book) return <p>Ładuję dane książki...</p>;

//   return (
//     <div>
//       <h2>{book.title}</h2>

//       {book.isbn && (
//         <img
//           src={getCoverUrl(book.isbn)}
//           alt={`Okładka książki ${book.title}`}
//           style={{ maxWidth: 200, marginBottom: 20, borderRadius: 8 }}
//           onError={(e) => { e.target.style.display = "none"; }}
//         />
//       )}

//       <p><b>Autor:</b> {book.author}</p>
//       <p><b>Opis:</b> {book.description}</p>

//       <div style={{ margin: "20px 0" }}>
//         <b>Wybierz pytanie:</b>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {questions.map(q => (
//             <li key={q.label} style={{ margin: "8px 0" }}>
//               <button
//                 onClick={() => handleQuestion(q.prompt, q.label)}
//                 disabled={loading}
//                 style={{
//                   background: activeQuestion === q.label ? "#e0e0e0" : "#fff",
//                   border: "1px solid #ccc",
//                   borderRadius: 4,
//                   padding: "6px 12px",
//                   cursor: "pointer"
//                 }}
//               >
//                 {q.label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {answer && (
//         <div style={{ marginTop: 20 }}>
//           <b>Odpowiedź Gemini:</b>
//           <p>{answer}</p>
//         </div>
//       )}

//       <hr style={{ margin: "40px 0" }} />

//       <h2>Zadaj inne pytanie</h2>
//       <form onSubmit={handleChat}>
//         <input
//           type="text"
//           value={prompt}
//           onChange={e => setPrompt(e.target.value)}
//           style={{ width: "80%" }}
//           placeholder="Zadaj pytanie o książkę..."
//         />
//         <button type="submit" disabled={chatLoading}>
//           {chatLoading ? "Wysyłanie..." : "Wyślij"}
//         </button>
//       </form>

//       {chatResponse && (
//         <div style={{ marginTop: 10 }}>
//           <b>Odpowiedź Gemini:</b> {chatResponse}
//         </div>
//       )}
//     </div>
//   );
// }




// function MainApp() {
//   // Stan dla rekomendacji
//   const [text, setText] = useState("");
//   const [emotion, setEmotion] = useState("");
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Stan dla chatu
//   const [prompt, setPrompt] = useState("");
//   const [chatResponse, setChatResponse] = useState("");
//   const [chatLoading, setChatLoading] = useState(false);

//   useEffect(() => {
//     const savedBooks = localStorage.getItem("books");
//     const savedEmotion = localStorage.getItem("emotion");
//     if (savedBooks) setBooks(JSON.parse(savedBooks));
//     if (savedEmotion) setEmotion(savedEmotion);
//   }, []);

//   const navigate = useNavigate();
//   const DEFAULT_COVER = "https://via.placeholder.com/48x72?text=No+cover";

//   // Obsługa rekomendacji
//   const handleRecommend = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setBooks([]);
//     setEmotion("");
//     try {
//       const res = await axios.post("http://localhost:5000/recommend", { text });
//       setEmotion(res.data.emotion);
//       setBooks(res.data.books);
//       localStorage.setItem("books", JSON.stringify(res.data.books));
//       localStorage.setItem("emotion", res.data.emotion);
//     } catch (err) {
//       alert("Błąd połączenia z backendem!");
//     }
//     setLoading(false);
//   };

//   // Obsługa chatu
//   const handleChat = async (e) => {
//     e.preventDefault();
//     setChatLoading(true);
//     setChatResponse("");
//     try {
//       const res = await axios.post("http://localhost:5000/chat", { prompt });
//       setChatResponse(res.data.response);
//     } catch (err) {
//       setChatResponse("Błąd połączenia z backendem!");
//     }
//     setChatLoading(false);
//   };

//   return (
//     <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
//       <h2>Book Advisor</h2>
//       <form onSubmit={handleRecommend}>
//         <label>
//           How are you feeling today?
//           <input
//             type="text"
//             value={text}
//             onChange={e => setText(e.target.value)}
//             style={{ width: "100%", margin: "10px 0" }}
//           />
//         </label>
//         <button type="submit" disabled={loading}>
//           {loading ? "Loading..." : "Get Recommendations"}
//         </button>
//       </form>
//       {emotion && (
//         <div>
//           <h3>Detected emotion: {emotion}</h3>
//           <p>
//             Wyświetlam {books.length} książek pasujących do Twojej emocji.
//           </p>
//            <ul style={{ padding: 0 }}>
//               {books.map((book, idx) => (
//                 <li key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 16, listStyle: "none" }}>
//                   {/* Okładka po ISBN z OpenLibrary */}
//                     <img
//                         src={getCoverUrl(book.isbn) || DEFAULT_COVER}
//                         alt={`Okładka książki ${book.title}`}
//                         style={{ width: 48, height: 72, objectFit: "cover", marginRight: 16, borderRadius: 4 }}
//                         onError={e => { e.target.onerror = null; e.target.src = DEFAULT_COVER; }}
//                       />
                
//                   <div>
//                     <button
//                       style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer", padding: 0, fontSize: 16 }}
//                       onClick={() => navigate(`/book/${encodeURIComponent(book.title)}`)}
//                     >
//                       <b>{book.title}</b>
//                     </button>
//                     <div style={{ fontSize: 14 }}>
//                       {book.author} ({book.dominant_emotion})
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//         </div>
//       )}

//       <hr style={{ margin: "40px 0" }} />
//     </div>
//   );
// }


// // Główny komponent z routingiem
// function App() {
//   const [books, setBooks] = useState([]);
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainApp books={books} setBooks={setBooks} />} />
//         <Route path="/book/:title" element={<BookDetails />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom"
import "./App.css"
import { BookOpen, Heart, MessageCircle, ArrowLeft, Sparkles } from "lucide-react"

function getCoverUrl(isbn) {
  if (!isbn || isbn === "null" || isbn === "undefined" || isbn.trim() === "") return null
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
}

function BookDetails() {
  const { title } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState("")
  const [prompt, setPrompt] = useState("")
  const [chatResponse, setChatResponse] = useState("")
  const [chatLoading, setChatLoading] = useState(false)

  const DEFAULT_COVER = "https://via.placeholder.com/200x300?text=No+Cover"

  useEffect(() => {
    axios
      .get(`http://localhost:5000/book/${encodeURIComponent(title)}`)
      .then((res) => setBook(typeof res.data === "string" ? JSON.parse(res.data) : res.data))
      .catch(() => setBook(null))
  }, [title])

  const questions = [
    {
      label: "Summary",
      prompt: `In a few words, summarize what this book is about. Title: ${book?.title}. Description: ${book?.description}`,
    },
    { label: "Main characters", prompt: `In a few words, who is the main character in the book "${book?.title}"?` },
    {
      label: "Main themes",
      prompt: `What are the main themes or motifs of the book "${book?.title}"?`,
    },
    {
      label: "Is it a series?",
      prompt: `Is the book "${book?.title}" part of a series? If so, which one?`,
    },
    { label: "Target age group", prompt: `What is the target age group for the book "${book?.title}"?` },
    { label: "Emotions", prompt: `What emotions does the book "${book?.title}" evoke?` },
    { label: "Awards", prompt: `Has the book "${book?.title}" won any awards? If so, which ones?` },
    {
      label: "Reader opinions",
      prompt: `What are the readers' opinions about the book "${book?.title}"?`,
    },
    {
      label: "Adaptations",
      prompt: `Has the book "${book?.title}" been adapted into a movie or TV series?`,
    },
    { label: "Similar books", prompt: `What other books are similar to "${book?.title}"?` },
    { label: "Main plot", prompt: `What is the main plot of the book "${book?.title}"?` },
    {
      label: "Important events",
      prompt: `What are the most important events in the book "${book?.title}"?`,
    },
    {
      label: "Ending without spoilers",
      prompt: `Does the book "${book?.title}" have a happy ending? Answer without spoilers.`,
    },
    {
      label: "Length",
      prompt: `How long does it take to read the book "${book?.title}"? How many pages does it have?`,
    },
    {
      label: "Original language",
      prompt: `In what language was the book "${book?.title}" originally written?`,
    },
    {
      label: "About the author",
      prompt: `Who is the author of "${book?.title}" and what other books has this author written?`,
    },
  ]

  const handleQuestion = async (prompt, label) => {
    setLoading(true)
    setAnswer("")
    setActiveQuestion(label)
    try {
      const res = await axios.post("http://localhost:5000/chat", { prompt })
      setAnswer(res.data.response)
    } catch {
      setAnswer("Error retrieving response.")
    }
    setLoading(false)
  }

  const handleChat = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setChatLoading(true)
    setChatResponse("")

    const finalPrompt = `Book: ${book.title}. Description: ${book.description}. Question: ${prompt.trim()}.`
    try {
      const res = await axios.post("http://localhost:5000/chat", { prompt: finalPrompt })
      setChatResponse(res.data.response)
    } catch {
      setChatResponse("Backend connection error!")
    }
    setChatLoading(false)
    setPrompt("")
  }

  if (!book) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <p>Loading book data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="book-page-container">
      <div className="container">
        {/* Header */}
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate("/")}>
            <ArrowLeft className="icon-small" />
            Back to recommendations
          </button>
        </div>

        {/* Book Info */}
        <div className="book-card">
          <div className="book-content">
            <div className="book-header">
              <div className="book-cover-container">
                <img
                  src={getCoverUrl(book.isbn) || DEFAULT_COVER}
                  alt={`Cover of ${book.title}`}
                  className="book-cover-large"
                  onError={(e) => {
                    e.target.src = DEFAULT_COVER
                  }}
                />
              </div>
              <div className="book-details">
                <h1 className="book-title">{book.title}</h1>
                <p className="book-author">{book.author}</p>
                <div className="book-description">
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="questions-card">
          <div className="card-header">
            <div className="header-with-icon">
              <MessageCircle className="icon" />
              <h2>Quick questions about the book</h2>
            </div>
            <p className="card-description">Select a question to learn more about this book</p>
          </div>
          <div className="card-content">
            <div className="questions-grid">
              {questions.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleQuestion(q.prompt, q.label)}
                  disabled={loading}
                  className={`question-btn ${activeQuestion === q.label ? "active" : ""}`}
                >
                  {loading && activeQuestion === q.label && <div className="btn-spinner"></div>}
                  {q.label}
                </button>
              ))}
            </div>

            {answer && (
              <div className="response-box">
                <div className="response-header">
                  <div className="icon-circle">
                    <Sparkles className="icon-small" />
                  </div>
                  <h4>AI Response:</h4>
                </div>
                <p className="response-text">{answer}</p>
              </div>
            )}
          </div>
        </div>

        <div className="separator"></div>

        {/* Custom Chat */}
        <div className="chat-card">
          <div className="card-header">
            <div className="header-with-icon">
              <MessageCircle className="icon" />
              <h2>Ask your own question</h2>
            </div>
            <p className="card-description">Ask anything related to this book</p>
          </div>
          <div className="card-content">
            <form onSubmit={handleChat} className="chat-form">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Is this book suitable for teenagers?"
                className="chat-input"
                disabled={chatLoading}
              />
              <button type="submit" disabled={chatLoading || !prompt.trim()} className="chat-button">
                {chatLoading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageCircle className="icon-small" />
                    Send question
                  </>
                )}
              </button>
            </form>

            {chatResponse && (
              <div className="chat-response-box">
                <div className="response-header">
                  <div className="icon-circle blue">
                    <MessageCircle className="icon-small" />
                  </div>
                  <h4>AI Response:</h4>
                </div>
                <p className="response-text">{chatResponse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MainApp() {
  // State for recommendations
  const [text, setText] = useState("")
  const [emotion, setEmotion] = useState("")
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedBooks = localStorage.getItem("books")
    const savedEmotion = localStorage.getItem("emotion")
    if (savedBooks) setBooks(JSON.parse(savedBooks))
    if (savedEmotion) setEmotion(savedEmotion)
  }, [])

  const navigate = useNavigate()
  const DEFAULT_COVER = "https://via.placeholder.com/120x180?text=No+Cover"

  // Handle recommendations
  const handleRecommend = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    setBooks([])
    setEmotion("")
    try {
      const res = await axios.post("http://localhost:5000/recommend", { text })
      setEmotion(res.data.emotion)
      setBooks(res.data.books)
      localStorage.setItem("books", JSON.stringify(res.data.books))
      localStorage.setItem("emotion", res.data.emotion)
    } catch (err) {
      console.error("Backend connection error:", err)
    }
    setLoading(false)
  }

  return (
    <div className="app-container">
      <div className="container">
        {/* Header */}
        <div className="app-header">
          <div className="logo-container">
            <div className="logo-circle">
              <BookOpen className="icon" />
            </div>
            <h1 className="app-title">Book Advisor</h1>
          </div>
          <p className="app-description">
            Discover perfect books tailored to your emotions. Tell us how you're feeling today, and we'll find the
            perfect reads for you.
          </p>
        </div>

        {/* Main Form */}
        <div className="form-card">
          <div className="card-header">
            <div className="header-with-icon">
              <Heart className="icon heart" />
              <h2>How are you feeling today?</h2>
            </div>
            <p className="card-description">
              Describe your current emotions, mood, or what you're looking for in a book
            </p>
          </div>
          <div className="card-content">
            <form onSubmit={handleRecommend} className="emotion-form">
              <div className="input-container">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. I'm feeling sad "
                  className="emotion-input"
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading || !text.trim()} className="submit-button">
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Finding perfect books...
                  </>
                ) : (
                  <>
                    <Sparkles className="icon-small" />
                    Find books for me
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        {emotion && (
          <div className="results-container">
            <div className="emotion-card">
              <div className="emotion-content">
                <div className="emotion-header">
                  <div className="icon-circle white">
                    <Heart className="icon" />
                  </div>
                  <div>
                    <h3 className="emotion-title">Detected emotion: {emotion}</h3>
                    <p className="emotion-subtitle">Found {books.length} books perfectly matched to your mood</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="books-grid">
              {books.map((book, idx) => (
                <div
                  key={idx}
                  className="book-item"
                  onClick={() => navigate(`/book/${encodeURIComponent(book.title)}`)}
                >
                  <div className="book-item-content">
                    <div className="book-cover-wrapper">
                      <img
                        src={getCoverUrl(book.isbn) || DEFAULT_COVER}
                        alt={`Cover of ${book.title}`}
                        className="book-cover"
                        onError={(e) => {
                          e.target.src = DEFAULT_COVER
                        }}
                      />
                    </div>
                    <div className="book-info">
                      <h4 className="book-item-title">{book.title}</h4>
                      <p className="book-item-author">{book.author}</p>
                      <span className="book-emotion-badge">{book.dominant_emotion}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!emotion && !loading && (
          <div className="empty-state">
            <div className="empty-state-content">
              <div className="empty-icon-circle">
                <BookOpen className="icon" />
              </div>
              <h3 className="empty-title">Ready to discover new books?</h3>
              <p className="empty-description">Describe your emotions above to get personalized recommendations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main component with routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/book/:title" element={<BookDetails />} />
      </Routes>
    </Router>
  )
}

export default App
