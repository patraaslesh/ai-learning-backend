import React, { useState } from "react";

export default function Planner() {
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!goal.trim()) return;

    try {
      setLoading(true);
      setPlan("");

      const res = await fetch("https://ai-backend.onrender.com/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal }),
      });

      const data = await res.json();

      if (data.error) {
        setPlan("⚠️ " + data.error);
      } else {
        setPlan(data);

        localStorage.setItem("tasksDone", 1);
        localStorage.setItem("streak", 2);
      }

    } catch (error) {
      setPlan("⚠️ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setGoal("");
    setPlan("");
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Study Planner</h2>

      <input
        className="w-full p-3 rounded bg-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your goal (e.g., Crack JEE in 7 days)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={generatePlan}
          className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "⏳ Generating..." : "Generate Plan"}
        </button>

        <button
          onClick={clearAll}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>

      <div className="mt-5 bg-gray-700 p-4 rounded min-h-[150px] whitespace-pre-wrap text-sm leading-relaxed">
        {loading
          ? "📘 Creating your personalized study plan..."
          : plan || "Your study plan will appear here..."}
      </div>
    </div>
  );
}