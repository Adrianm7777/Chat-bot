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
      const res = await fetch("http://127.0.0.1:8000//api/chatbot/ask", {
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
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-14">
      <p>
        <strong>Question:</strong> {question || "No question asked yet."}
      </p>
      <p>
        <strong>Response:</strong> {response || "No response yet."}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col"
      >
        <textarea
          className="border-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          cols={50}
          placeholder="Type your question here..."
        />
        <br />
        <button
          type="submit"
          className="bg-zinc-600 w-1/5 rounded-sm"
          disabled={loading}
        >
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>
    </div>
  );
}
