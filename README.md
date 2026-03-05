# 🎬 AI Movie Insight Builder

A full-stack web application that allows users to enter an IMDb movie ID and receive detailed movie information along with AI-based audience sentiment insights.

This project demonstrates modern full-stack development using Next.js, API routes, and a lightweight NLP sentiment analysis engine.

---

# 🚀 Live Demo

Deployed on **Vercel**

Live URL:
(https://ai-movie-insight-s7sp.vercel.app/)

---

# 📌 Features

* Search movies using **IMDb ID**
* Fetch movie details including:

  * Title
  * Poster
  * Release year
  * IMDb rating
  * Plot summary
  * Cast list
* AI-powered **Audience Sentiment Analysis**
* Sentiment classification:

  * Positive
  * Mixed
  * Negative
* Clean and modern UI
* Error handling and input validation
* Responsive design (desktop + mobile)

---

# 🧠 AI Sentiment Analysis

The project implements a **lightweight NLP sentiment engine** that analyzes audience reviews and classifies the overall sentiment.

### How it works

1. Audience reviews are collected (currently simulated sample reviews).
2. The text is tokenized into words.
3. Words are compared against **positive and negative lexical dictionaries**.
4. A sentiment score is calculated.
5. Based on the score, the system classifies the movie sentiment as:

   * Positive
   * Mixed
   * Negative

This approach demonstrates how basic Natural Language Processing can be implemented without relying on external AI APIs.

The architecture allows easy integration with advanced LLM models such as OpenAI or other sentiment analysis APIs in the future.

---

# 🛠 Tech Stack

### Frontend

* Next.js (React framework)
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes (Node.js)

### APIs

* OMDb API (Movie data)

### AI / NLP

* Custom lexical sentiment analysis engine

### Deployment

* Vercel

### Testing

* Jest (basic unit testing)

---

# 📂 Project Structure

```
ai-movie-insight
│
├── app
│   ├── api
│   │   ├── movie
│   │   │   └── route.ts
│   │   └── sentiment
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── MovieCard.tsx
│   ├── SearchBar.tsx
│   ├── SentimentBox.tsx
│   └── LoadingSpinner.tsx
│
├── __tests__
│   └── movie.test.ts
│
├── public
├── styles
├── .env.local
├── package.json
└── README.md
```

---

# ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/ai-movie-insight.git
cd ai-movie-insight
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Create environment variables

Create a file named:

```
.env.local
```

Add your OMDb API key:

```
OMDB_API_KEY=your_api_key_here
```

You can obtain a free API key from:
http://www.omdbapi.com/

---

### 4️⃣ Run the development server

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🧪 Running Tests

Run the test suite using:

```
npm test
```

Example test checks API behavior when IMDb ID is missing.

---

# 🛡 Error Handling

The application gracefully handles:

* Invalid IMDb IDs
* Missing input fields
* Movie not found
* API errors
* Server errors

---

# 📈 Future Improvements

Possible enhancements:

* Fetch real audience reviews from TMDB or IMDb
* Use advanced AI models (LLMs) for deeper sentiment analysis
* Add movie recommendations
* Add charts for sentiment visualization
* Improve UI animations and design

---

# 📄 Assumptions

* OMDb API is used as the primary movie metadata source.
* Audience reviews are simulated for demonstration due to API limitations.
* The NLP sentiment engine provides lightweight analysis suitable for prototype applications.

---

# 👨‍💻 Author

Raghu Naga Rohit Kampati

---

# 📜 License

This project was created for a technical assignment and educational purposes.
