// src/app/page.tsx

"use client";

import { useState, useEffect } from "react";
import InputForm from "@/components/InputForm";
import Summary from "@/components/Summary";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastTopic, setLastTopic] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // 📦 Load last searches
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(stored);
  }, []);

  // 💾 Save last 3 searches
  const saveHistory = (topic: string) => {
    const updated = [topic, ...history.filter((t) => t !== topic)].slice(0, 3);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  const handleSubmit = async (topic: string, grade: string) => {
    setLoading(true);
    setError("");
    setData(null);
    setLastTopic(topic);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic, grade }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      setData(result);
      saveHistory(topic);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Regenerate
  const handleRegenerate = () => {
    if (lastTopic) handleSubmit(lastTopic, "6");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          🤖 AI Learning Assistant
        </h1>

        <InputForm onSubmit={handleSubmit} />

        {/* 🔄 History */}
        {history.length > 0 && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">🕘 Recent Topics</h2>
            <div className="flex gap-2 flex-wrap">
              {history.map((t, i) => (
                <button
                  key={i}
                  onClick={() => handleSubmit(t, "6")}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ⏳ Loading */}
        {loading && (
          <div className="text-center text-blue-500 font-semibold">
            ⏳ Generating content...
          </div>
        )}

        {/* ❌ Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded">
            ❌ {error}
          </div>
        )}

        {/* 📊 Output */}
        {data && (
          <div className="space-y-4">
            <Summary text={data.summary} />
            <KeyPoints points={data.keyPoints} />
            <Quiz quiz={data.quiz} />

            <button
              onClick={handleRegenerate}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              🔄 Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}