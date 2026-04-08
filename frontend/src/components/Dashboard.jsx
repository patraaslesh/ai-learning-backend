import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [tasksDone, setTasksDone] = useState(0);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasksDone") || 0;
    const savedStreak = localStorage.getItem("streak") || 1;

    setTasksDone(Number(savedTasks));
    setStreak(Number(savedStreak));

    const calculatedProgress = Math.min((savedTasks / 7) * 100, 100);
    setProgress(calculatedProgress);
  }, []);

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Progress Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-gray-700 p-4 rounded text-center">
          <p>Tasks Done</p>
          <p className="text-2xl font-bold">{tasksDone}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded text-center">
          <p>Streak</p>
          <p className="text-2xl font-bold">{streak} 🔥</p>
        </div>

        <div className="bg-gray-700 p-4 rounded text-center">
          <p>Progress</p>
          <p className="text-2xl font-bold">{progress.toFixed(0)}%</p>
        </div>

      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-600 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}