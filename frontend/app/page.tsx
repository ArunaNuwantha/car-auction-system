"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setSavedUsername(storedUsername);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError("");
  };

  const handleSaveUsername = () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    localStorage.setItem("username", username.trim());
    setSavedUsername(username.trim());
    setUsername("");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {!savedUsername ? (
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <button
            onClick={handleSaveUsername}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Username
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      ) : (
        <p className="text-lg">Welcome, {savedUsername}!</p>
      )}

      <Link
        href={savedUsername ? "/auction" : "#"}
        className={`${
          savedUsername
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-300 cursor-not-allowed"
        } text-white px-4 py-2 rounded`}
        onClick={(e) => {
          if (!savedUsername) e.preventDefault();
        }}
      >
        GO TO AUCTION
      </Link>
    </div>
  );
}
