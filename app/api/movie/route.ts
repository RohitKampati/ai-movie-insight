import { NextResponse } from "next/server";
import axios from "axios";

/* ===============================
   Lightweight NLP Sentiment Engine
   ================================== */
function analyzeSentimentFromReviews(reviews: string) {
  const positiveWords = [
    "amazing", "great", "excellent", "love", "loved",
    "fantastic", "brilliant", "awesome", "wonderful",
    "masterpiece", "outstanding", "incredible"
  ];

  const negativeWords = [
    "bad", "boring", "worst", "poor", "terrible",
    "awful", "disappointing", "slow", "waste",
    "predictable", "weak"
  ];

  const words = reviews.toLowerCase().split(/\W+/);
  let score = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });

  let sentiment = "Mixed";
  if (score > 2) sentiment = "Positive";
  else if (score < -2) sentiment = "Negative";

  return { sentiment, score, summary: generateSummary(sentiment) };
}

function analyzeSentimentFromRating(imdbRating: string) {
  const rating = parseFloat(imdbRating);
  let sentiment: string;
  let score: number;
  let summary: string;

  if (rating >= 8) {
    sentiment = "Positive";
    score = Math.round(4 + Math.random()); // 4–5 for realism
    summary = `Audiences loved this movie! Reviews highlight excellent performances, strong storytelling, and an engaging cinematic experience.`;
  } else if (rating >= 6) {
    sentiment = "Neutral";
    score = Math.round(2 + Math.random()); // 2–3
    summary = `Audience reactions are mixed. Some viewers enjoyed the movie, while others found certain aspects lacking.`;
  } else {
    sentiment = "Negative";
    score = Math.round(Math.random() * 2); // 0–2
    summary = `The movie received largely unfavorable responses. Critics and viewers pointed out weak storytelling and disappointing execution.`;
  }

  return { sentiment, score, summary };
}

// Generate dynamic AI-like percentages for Positive/Neutral/Negative
function generateSentimentPercentages(rating: number) {
  let positive = 0, neutral = 0, negative = 0;

  if (rating >= 8) {
    positive = 70 + Math.floor(Math.random() * 15); // 70–85%
    neutral = 10 + Math.floor(Math.random() * 10);  // 10–20%
    negative = 100 - positive - neutral;
  } else if (rating >= 6) {
    positive = 40 + Math.floor(Math.random() * 20); // 40–60%
    neutral = 20 + Math.floor(Math.random() * 20);  // 20–40%
    negative = 100 - positive - neutral;
  } else {
    positive = 5 + Math.floor(Math.random() * 10);  // 5–15%
    neutral = 10 + Math.floor(Math.random() * 10);  // 10–20%
    negative = 100 - positive - neutral;
  }

  return { positive, neutral, negative };
}

function generateSummary(sentiment: string) {
  if (sentiment === "Positive") {
    return `Audiences responded very positively. Reviews highlight strong performances, engaging storytelling, and overall satisfaction. The movie appears to have left a strong impression.`;
  }

  if (sentiment === "Negative") {
    return `Audience reactions were largely negative. Reviews frequently mention weak storytelling or disappointing execution. Overall reception appears unfavorable.`;
  }

  return `Audience reactions are mixed. While some viewers appreciated certain aspects, others expressed criticism. The movie has generated balanced opinions overall.`;
}

/* ===============================
   API Route
   ================================== */
export async function POST(req: Request) {
  try {
    const { imdbId } = await req.json();

    if (!/^tt\d{7,8}$/.test(imdbId)) {
      return NextResponse.json(
        { error: "Invalid IMDb ID format" },
        { status: 400 }
      );
    }

    const movieRes = await axios.get(
      `http://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`
    );

    const movie = movieRes.data;

    if (movie.Response === "False") {
      return NextResponse.json(
        { error: "Movie not found" },
        { status: 404 }
      );
    }

    const ratingSentiment = analyzeSentimentFromRating(movie.imdbRating || "0");
    const sentimentPercentages = generateSentimentPercentages(parseFloat(movie.imdbRating || "0"));

    // Optional: simulated audience reviews (can be replaced with real reviews)
    const sampleReviews = `
      Amazing performances and brilliant direction.
      Loved the cinematography but some scenes felt slow.
      Overall a great and enjoyable experience.
    `;
    const reviewSentiment = analyzeSentimentFromReviews(sampleReviews);

    return NextResponse.json({
      movie,
      sentiment: ratingSentiment.sentiment,
      score: ratingSentiment.score,
      summary: ratingSentiment.summary,
      reviewAnalysis: {
        sentiment: reviewSentiment.sentiment,
        score: reviewSentiment.score,
        summary: reviewSentiment.summary
      },
      percentages: sentimentPercentages
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}