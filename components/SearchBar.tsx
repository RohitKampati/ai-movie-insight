"use client";

import { useState } from "react";

interface Props {
  onSearch: (imdbId: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [imdbId, setImdbId] = useState("");

  const handleSearch = () => {
    if (!imdbId.trim()) return;

    onSearch(imdbId.trim());
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">

  <input
    type="text"
    placeholder="Enter IMDb ID (e.g. tt0133093)"
    value={imdbId}
    onChange={(e) => setImdbId(e.target.value)}
    className="flex-1 px-5 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />

  <button
    onClick={handleSearch}
    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition"
  >
    Search
  </button>

</div>
  );
}