import React from "react";
import Planner from "./components/Planner";
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-2">
        AI Learning Assistant for Students 🚀
      </h1>

      <p className="text-center text-gray-400 mb-6">
        Personalized study plans and AI-powered doubt solving
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Planner />
        <Chat />
      </div>

      <div className="mt-6">
        <Dashboard />
      </div>
    </div>
  );
}