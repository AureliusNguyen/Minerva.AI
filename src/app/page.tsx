"use client";

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      console.log(data);
      setInputText("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      {/* Navbar */}
      <div className="navbar rounded-lg">
        <div className="flex-1">
          <a className="btn btn-accent text-xl text-background">Minerva.AI</a>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1">{/* Main content can go here */}</main>

      {/* Footer */}
      <footer className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-black/[.05] border border-accent text- focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-500 disabled:opacity-50"
              placeholder="Describe the image you want to generate..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 btn btn-outline btn-accent rounded-lg text-background duration-800 disabled:opacity-50"
              style={{ width: "120px" }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner"></span>
                  Generating
                </span>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}
