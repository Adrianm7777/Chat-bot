"use client";

import { useState } from "react";

export default function ChatbotPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chatbot/ask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.response || "Sorry, I could not find an answer.");
    } catch (error) {
      console.error("Error asking chatbot:", error);
      setResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Chatbot</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <p className="mb-2">
          <strong>Question:</strong> {question || "No question asked yet."}
        </p>
        <p className="mb-4">
          <strong>Response:</strong> {response || "No response yet."}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <textarea
            className="border-2 border-gray-300 rounded-md p-2 mb-4 resize-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            placeholder="Type your question here..."
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white w-full rounded-md py-2 transition duration-200 ease-in-out hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
}
