// src/app/page.tsx

"use client";

import { useState, useEffect } from "react";
import InputForm from "@/components/InputForm";
import Summary from "@/components/Summary";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import { AIResponse } from "@/types";

export default function Home() {
  const [data, setData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastTopic, setLastTopic] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showSimple, setShowSimple] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(stored);
  }, []);

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

  const handleRegenerate = () => {
    if (lastTopic) handleSubmit(lastTopic, "6");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          🤖 AI Learning Assistant
        </h1>

        <InputForm onSubmit={handleSubmit} />

        {/* Toggle */}
        {data && (
          <button
            onClick={() => setShowSimple(!showSimple)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showSimple ? "Show Normal Explanation" : "Show Simplified"}
          </button>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">🕘 Recent Topics</h2>
            {history.map((t, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(t, "6")}
                className="bg-gray-200 px-2 py-1 m-1 rounded"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {loading && <p>⏳ Generating...</p>}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded">
            ❌ {error}
          </div>
        )}

        {data && (
          <>
           <Summary
  text={
    showSimple
      ? data.simplifiedSummary
      : data.originalSummary
  }
  isSimple={showSimple}
/>
            <KeyPoints points={data.keyPoints} />
            <Quiz quiz={data.quiz} />

            <button
              onClick={handleRegenerate}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              🔄 Regenerate
            </button>
          </>
        )}
      </div>
    </div>
  );
}