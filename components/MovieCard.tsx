"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Movie = {
  Title: string;
  Year: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
  Actors: string;
};

type Props = {
  movie: Movie;
  sentiment: string;
  summary: string;
  score: number;
};

export default function MovieCard({ movie, sentiment, summary, score }: Props) {

  const getSentimentColor = () => {
    if (sentiment === "Positive") return "text-green-400";
    if (sentiment === "Negative") return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row gap-10">

        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={288}
          height={432}
          className="rounded-2xl shadow-xl"
        />

        <div>
          <h2 className="text-4xl font-bold">{movie.Title}</h2>

          <p className="mt-3 text-gray-400">
            {movie.Year} • ⭐ {movie.imdbRating}
          </p>

          <p className="mt-6 text-gray-300 leading-relaxed">
            {movie.Plot}
          </p>

          <p className="mt-6">
            <span className="font-semibold text-purple-400">Cast:</span>{" "}
            {movie.Actors}
          </p>

          <div className="mt-8 p-6 rounded-2xl border border-zinc-700 bg-black">
            <h3 className="text-xl font-bold mb-3">
              AI Audience Sentiment
            </h3>

            <p className={`text-lg font-semibold ${getSentimentColor()}`}>
              {sentiment}
            </p>

            <p className="mt-3 text-gray-300">
              {summary}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Sentiment Score: {score}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}