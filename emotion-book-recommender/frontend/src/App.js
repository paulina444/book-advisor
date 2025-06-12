// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom"
// import "./App.css"
// import { BookOpen, Heart, MessageCircle, ArrowLeft, Sparkles } from "lucide-react"

// function getCoverUrl(isbn) {
//   if (!isbn || isbn === "null" || isbn === "undefined" || isbn.trim() === "") return null
//   return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
// }

// function BookDetails() {
//   const { title } = useParams()
//   const navigate = useNavigate()
//   const [book, setBook] = useState(null)
//   const [answer, setAnswer] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [activeQuestion, setActiveQuestion] = useState("")
//   const [prompt, setPrompt] = useState("")
//   const [chatResponse, setChatResponse] = useState("")
//   const [chatLoading, setChatLoading] = useState(false)

//   const DEFAULT_COVER = "https://via.placeholder.com/200x300?text=No+Cover"

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/book/${encodeURIComponent(title)}`)
//       .then((res) => setBook(typeof res.data === "string" ? JSON.parse(res.data) : res.data))
//       .catch(() => setBook(null))
//   }, [title])

//   const questions = [
//     {
//       label: "Summary",
//       prompt: `In a few words, summarize what this book is about. Title: ${book?.title}. Description: ${book?.description}`,
//     },
//     { label: "Main characters", prompt: `In a few words, who is the main character in the book "${book?.title}"?` },
//     {
//       label: "Main themes",
//       prompt: `What are the main themes or motifs of the book "${book?.title}"?`,
//     },
//     {
//       label: "Is it a series?",
//       prompt: `Is the book "${book?.title}" part of a series? If so, which one?`,
//     },
//     { label: "Target age group", prompt: `What is the target age group for the book "${book?.title}"?` },
//     { label: "Emotions", prompt: `What emotions does the book "${book?.title}" evoke?` },
//     { label: "Awards", prompt: `Has the book "${book?.title}" won any awards? If so, which ones?` },
//     {
//       label: "Reader opinions",
//       prompt: `What are the readers' opinions about the book "${book?.title}"?`,
//     },
//     {
//       label: "Adaptations",
//       prompt: `Has the book "${book?.title}" been adapted into a movie or TV series?`,
//     },
//     { label: "Similar books", prompt: `What other books are similar to "${book?.title}"?` },
//     { label: "Main plot", prompt: `What is the main plot of the book "${book?.title}"?` },
//     {
//       label: "Important events",
//       prompt: `What are the most important events in the book "${book?.title}"?`,
//     },
//     {
//       label: "Ending without spoilers",
//       prompt: `Does the book "${book?.title}" have a happy ending? Answer without spoilers.`,
//     },
//     {
//       label: "Length",
//       prompt: `How long does it take to read the book "${book?.title}"? How many pages does it have?`,
//     },
//     {
//       label: "Original language",
//       prompt: `In what language was the book "${book?.title}" originally written?`,
//     },
//     {
//       label: "About the author",
//       prompt: `Who is the author of "${book?.title}" and what other books has this author written?`,
//     },
//   ]

//   const handleQuestion = async (prompt, label) => {
//     setLoading(true)
//     setAnswer("")
//     setActiveQuestion(label)
//     try {
//       const res = await axios.post("http://localhost:5000/chat", { prompt })
//       setAnswer(res.data.response)
//     } catch {
//       setAnswer("Error retrieving response.")
//     }
//     setLoading(false)
//   }

//   const handleChat = async (e) => {
//     e.preventDefault()
//     if (!prompt.trim()) return
//     setChatLoading(true)
//     setChatResponse("")

//     const finalPrompt = `Book: ${book.title}. Description: ${book.description}. Question: ${prompt.trim()}.`
//     try {
//       const res = await axios.post("http://localhost:5000/chat", { prompt: finalPrompt })
//       setChatResponse(res.data.response)
//     } catch {
//       setChatResponse("Backend connection error!")
//     }
//     setChatLoading(false)
//     setPrompt("")
//   }

//   if (!book) {
//     return (
//       <div className="loading-container">
//         <div className="loading-card">
//           <div className="loading-spinner"></div>
//           <p>Loading book data...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="book-page-container">
//       <div className="container">
//         {/* Header */}
//         <div className="back-button-container">
//           <button className="back-button" onClick={() => navigate("/")}>
//             <ArrowLeft className="icon-small" />
//             Back to recommendations
//           </button>
//         </div>

//         {/* Book Info */}
//         <div className="book-card">
//           <div className="book-content">
//             <div className="book-header">
//               <div className="book-cover-container">
//                 <img
//                   src={getCoverUrl(book.isbn) || DEFAULT_COVER}
//                   alt={`Cover of ${book.title}`}
//                   className="book-cover-large"
//                   onError={(e) => {
//                     e.target.src = DEFAULT_COVER
//                   }}
//                 />
//               </div>
//               <div className="book-details">
//                 <h1 className="book-title">{book.title}</h1>
//                 <p className="book-author">{book.author}</p>
//                 <div className="book-description">
//                   <p>{book.description}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Questions Section */}
//         <div className="questions-card">
//           <div className="card-header">
//             <div className="header-with-icon">
//               <MessageCircle className="icon" />
//               <h2>Quick questions about the book</h2>
//             </div>
//             <p className="card-description">Select a question to learn more about this book</p>
//           </div>
//           <div className="card-content">
//             <div className="questions-grid">
//               {questions.map((q) => (
//                 <button
//                   key={q.label}
//                   onClick={() => handleQuestion(q.prompt, q.label)}
//                   disabled={loading}
//                   className={`question-btn ${activeQuestion === q.label ? "active" : ""}`}
//                 >
//                   {loading && activeQuestion === q.label && <div className="btn-spinner"></div>}
//                   {q.label}
//                 </button>
//               ))}
//             </div>

//             {answer && (
//               <div className="response-box">
//                 <div className="response-header">
//                   <div className="icon-circle">
//                     <Sparkles className="icon-small" />
//                   </div>
//                   <h4>AI Response:</h4>
//                 </div>
//                 <p className="response-text">{answer}</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="separator"></div>

//         {/* Custom Chat */}
//         <div className="chat-card">
//           <div className="card-header">
//             <div className="header-with-icon">
//               <MessageCircle className="icon" />
//               <h2>Ask your own question</h2>
//             </div>
//             <p className="card-description">Ask anything related to this book</p>
//           </div>
//           <div className="card-content">
//             <form onSubmit={handleChat} className="chat-form">
//               <input
//                 type="text"
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder="e.g. Is this book suitable for teenagers?"
//                 className="chat-input"
//                 disabled={chatLoading}
//               />
//               <button type="submit" disabled={chatLoading || !prompt.trim()} className="chat-button">
//                 {chatLoading ? (
//                   <>
//                     <div className="btn-spinner"></div>
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <MessageCircle className="icon-small" />
//                     Send question
//                   </>
//                 )}
//               </button>
//             </form>

//             {chatResponse && (
//               <div className="chat-response-box">
//                 <div className="response-header">
//                   <div className="icon-circle blue">
//                     <MessageCircle className="icon-small" />
//                   </div>
//                   <h4>AI Response:</h4>
//                 </div>
//                 <p className="response-text">{chatResponse}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function MainApp() {
//   // State for recommendations
//   const [text, setText] = useState("")
//   const [emotion, setEmotion] = useState("")
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const savedBooks = localStorage.getItem("books")
//     const savedEmotion = localStorage.getItem("emotion")
//     if (savedBooks) setBooks(JSON.parse(savedBooks))
//     if (savedEmotion) setEmotion(savedEmotion)
//   }, [])

//   const navigate = useNavigate()
//   const DEFAULT_COVER = "https://via.placeholder.com/120x180?text=No+Cover"

//   // Handle recommendations
//   const handleRecommend = async (e) => {
//     e.preventDefault()
//     if (!text.trim()) return

//     setLoading(true)
//     setBooks([])
//     setEmotion("")
//     try {
//       const res = await axios.post("http://localhost:5000/recommend", { text })
//       setEmotion(res.data.emotion)
//       setBooks(res.data.books)
//       localStorage.setItem("books", JSON.stringify(res.data.books))
//       localStorage.setItem("emotion", res.data.emotion)
//     } catch (err) {
//       console.error("Backend connection error:", err)
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="app-container">
//       <div className="container">
//         {/* Header */}
//         <div className="app-header">
//           <div className="logo-container">
//             <div className="logo-circle">
//               <BookOpen className="icon" />
//             </div>
//             <h1 className="app-title">Book Advisor</h1>
//           </div>
//           <p className="app-description">
//             Discover perfect books tailored to your emotions. Tell us how you're feeling today, and we'll find the
//             perfect reads for you.
//           </p>
//         </div>

//         {/* Main Form */}
//         <div className="form-card">
//           <div className="card-header">
//             <div className="header-with-icon">
//               <Heart className="icon heart" />
//               <h2>How are you feeling today?</h2>
//             </div>
//             <p className="card-description">
//               Describe your current emotions, mood, or what you're looking for in a book
//             </p>
//           </div>
//           <div className="card-content">
//             <form onSubmit={handleRecommend} className="emotion-form">
//               <div className="input-container">
//                 <input
//                   type="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   placeholder="e.g. I'm feeling sad "
//                   className="emotion-input"
//                   disabled={loading}
//                 />
//               </div>
//               <button type="submit" disabled={loading || !text.trim()} className="submit-button">
//                 {loading ? (
//                   <>
//                     <div className="btn-spinner"></div>
//                     Finding perfect books...
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="icon-small" />
//                     Find books for me
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Results */}
//         {emotion && (
//           <div className="results-container">
//             <div className="emotion-card">
//               <div className="emotion-content">
//                 <div className="emotion-header">
//                   <div className="icon-circle white">
//                     <Heart className="icon" />
//                   </div>
//                   <div>
//                     <h3 className="emotion-title">Detected emotion: {emotion}</h3>
//                     <p className="emotion-subtitle">Found {books.length} books perfectly matched to your mood</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="books-grid">
//               {books.map((book, idx) => (
//                 <div
//                   key={idx}
//                   className="book-item"
//                   onClick={() => navigate(`/book/${encodeURIComponent(book.title)}`)}
//                 >
//                   <div className="book-item-content">
//                     <div className="book-cover-wrapper">
//                       <img
//                         src={getCoverUrl(book.isbn) || DEFAULT_COVER}
//                         alt={`Cover of ${book.title}`}
//                         className="book-cover"
//                         onError={(e) => {
//                           e.target.src = DEFAULT_COVER
//                         }}
//                       />
//                     </div>
//                     <div className="book-info">
//                       <h4 className="book-item-title">{book.title}</h4>
//                       <p className="book-item-author">{book.author}</p>
//                       <span className="book-emotion-badge">{book.dominant_emotion}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!emotion && !loading && (
//           <div className="empty-state">
//             <div className="empty-state-content">
//               <div className="empty-icon-circle">
//                 <BookOpen className="icon" />
//               </div>
//               <h3 className="empty-title">Ready to discover new books?</h3>
//               <p className="empty-description">Describe your emotions above to get personalized recommendations</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Main component with routing
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainApp />} />
//         <Route path="/book/:title" element={<BookDetails />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App
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
    // Set a flag in localStorage to indicate we're viewing book details
    localStorage.setItem("viewingBookDetails", "true")

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
      prompt: `Tell something about ending of"${book?.title}"? Answer without spoilers.`,
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
  const [showSavedBooks, setShowSavedBooks] = useState(false)

  useEffect(() => {
    // Check if this is a fresh page load or a navigation back from book details
    const isFirstLoad = !localStorage.getItem("appInitialized")
    const comingFromBookDetails = localStorage.getItem("viewingBookDetails") === "true"

    if (isFirstLoad && !comingFromBookDetails) {
      // First time loading the app - don't show any books
      localStorage.setItem("appInitialized", "true")
      setShowSavedBooks(false)
    } else if (comingFromBookDetails) {
      // Coming back from book details - show saved books
      const savedBooks = localStorage.getItem("books")
      const savedEmotion = localStorage.getItem("emotion")
      if (savedBooks) setBooks(JSON.parse(savedBooks))
      if (savedEmotion) setEmotion(savedEmotion)
      setShowSavedBooks(true)

      // Reset the flag
      localStorage.removeItem("viewingBookDetails")
    } else {
      // Normal navigation or refresh - check if we have books to show
      const savedBooks = localStorage.getItem("books")
      const savedEmotion = localStorage.getItem("emotion")
      const hasPerformedSearch = localStorage.getItem("hasPerformedSearch") === "true"

      if (savedBooks && hasPerformedSearch) {
        setBooks(JSON.parse(savedBooks))
        if (savedEmotion) setEmotion(savedEmotion)
        setShowSavedBooks(true)
      }
    }
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
      localStorage.setItem("hasPerformedSearch", "true")
      setShowSavedBooks(true)
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
        {showSavedBooks && emotion && (
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
        {(!showSavedBooks || !emotion) && !loading && (
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
