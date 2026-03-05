"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Movie {
  Title: string;
  Year: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
  Actors: string;
}

type SentimentType = "Positive" | "Mixed" | "Negative";

export default function Home() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [sentiment, setSentiment] = useState<SentimentType | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchMovie = async (imdbId: string) => {
    try {
      setLoading(true);
      setError("");
      setMovie(null);

      const response = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imdbId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // API now returns structured data
      setMovie(data.movie);
      setSentiment(data.sentiment);
      setSummary(data.summary);
      setScore(data.score);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold text-center">
          🎬 AI Movie Insight Builder
        </h1>

        <SearchBar onSearch={fetchMovie} />

        {loading && <LoadingSpinner />}

        {error && (
          <p className="text-red-500 text-center font-medium">
            {error}
          </p>
        )}

        {movie && sentiment && (
          <MovieCard
            movie={movie}
            sentiment={sentiment}
            summary={summary}
            score={score}
          />
        )}

      </div>
    </main>
  );
}