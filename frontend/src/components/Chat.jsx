import React, { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setResponse("");

      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.error) {
        setResponse("⚠️ " + data.error);
      } else {
        setResponse(data);
      }

    } catch (error) {
      setResponse("⚠️ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const simplifyResponse = () => {
    if (!response) return;
    setMessage("Explain this in simpler terms: " + response);
  };

  const clearAll = () => {
    setMessage("");
    setResponse("");
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Doubt Solver</h2>

      <input
        className="w-full p-3 rounded bg-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Ask your doubt..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {loading ? "🤖 Thinking..." : "Ask AI"}
        </button>

        <button
          onClick={simplifyResponse}
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Simplify
        </button>

        <button
          onClick={clearAll}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 bg-gray-700 p-3 rounded min-h-[120px] whitespace-pre-wrap">
        {loading ? "🤖 Thinking..." : response || "Your answer will appear here..."}
      </div>
    </div>
  );
}