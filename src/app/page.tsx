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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #080808;
          color: #e8e2d4;
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
        }

        .page-root {
          min-height: 100vh;
          background: #080808;
          background-image:
            radial-gradient(ellipse 80% 40% at 50% -10%, rgba(212,168,72,0.08) 0%, transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.015) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.015) 40px);
          padding: 40px 20px 80px;
        }

        .container {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* HEADER */
        .header {
          text-align: center;
          padding: 20px 0 10px;
          position: relative;
        }
        .header-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          color: #d4a848;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0.8;
        }
        .header h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #f0ead6;
          line-height: 1.1;
        }
        .header h1 span {
          color: #d4a848;
        }
        .header-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #d4a848, transparent);
          margin: 18px auto 0;
        }

        /* CARD BASE */
        .card {
          background: #111010;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 24px 28px;
          position: relative;
          overflow: hidden;
        }
        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,168,72,0.03) 0%, transparent 60%);
          pointer-events: none;
        }

        /* CARD SECTION LABEL */
        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: #d4a848;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(212,168,72,0.2);
        }

        /* INPUT FORM */
        .input-grid {
          display: grid;
          grid-template-columns: 1fr 120px;
          gap: 12px;
          margin-bottom: 14px;
        }
        @media (max-width: 500px) {
          .input-grid { grid-template-columns: 1fr; }
        }

        .field input {
          width: 100%;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 13px 16px;
          color: #e8e2d4;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field input::placeholder { color: rgba(255,255,255,0.2); }
        .field input:focus {
          border-color: rgba(212,168,72,0.5);
          box-shadow: 0 0 0 3px rgba(212,168,72,0.06);
        }

        .btn-primary {
          width: 100%;
          background: #d4a848;
          color: #080808;
          border: none;
          border-radius: 8px;
          padding: 13px 20px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-primary:hover {
          background: #e0b85a;
          box-shadow: 0 4px 24px rgba(212,168,72,0.25);
        }
        .btn-primary:active { transform: scale(0.98); }

        /* TOGGLE */
        .toggle-bar {
          display: flex;
          background: #111010;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 5px;
          gap: 4px;
        }
        .toggle-btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 7px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: rgba(255,255,255,0.3);
        }
        .toggle-btn.active {
          background: #1a1a1a;
          color: #d4a848;
          border: 1px solid rgba(212,168,72,0.2);
        }

        /* HISTORY */
        .history-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .history-chip {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: 6px 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #a89880;
          cursor: pointer;
          transition: all 0.15s;
        }
        .history-chip:hover {
          background: rgba(212,168,72,0.08);
          border-color: rgba(212,168,72,0.3);
          color: #d4a848;
        }

        /* LOADING */
        .loading-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 24px;
          background: #111010;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
        }
        .loading-dots {
          display: flex;
          gap: 5px;
        }
        .loading-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4a848;
          animation: pulse 1.2s ease-in-out infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        .loading-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }

        /* ERROR */
        .error-box {
          background: rgba(220,60,60,0.07);
          border: 1px solid rgba(220,60,60,0.2);
          border-radius: 10px;
          padding: 14px 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #e07070;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* SUMMARY */
        .summary-text {
          font-size: 15px;
          line-height: 1.75;
          color: #c8c0b0;
        }

        /* KEY POINTS */
        .key-points-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
        }
        .key-point-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.6;
          color: #c0b8a8;
          transition: border-color 0.15s;
        }
        .key-point-item:hover { border-color: rgba(212,168,72,0.15); }
        .key-point-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #d4a848;
          padding-top: 2px;
          min-width: 20px;
          opacity: 0.7;
        }

        /* QUIZ */
        .quiz-question {
          margin-bottom: 26px;
        }
        .quiz-q-text {
          font-size: 15px;
          font-weight: 600;
          color: #e0d8c8;
          margin-bottom: 12px;
          padding-left: 4px;
          border-left: 2px solid #d4a848;
          padding-left: 12px;
        }
        .quiz-option {
          display: block;
          width: 100%;
          text-align: left;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 10px 16px;
          margin-top: 8px;
          color: #b0a898;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .quiz-option:hover:not(:disabled) {
          background: rgba(212,168,72,0.05);
          border-color: rgba(212,168,72,0.25);
          color: #e0d8c8;
        }
        .quiz-option:disabled { cursor: not-allowed; }
        .quiz-option.selected {
          background: rgba(212,168,72,0.1);
          border-color: rgba(212,168,72,0.4);
          color: #d4a848;
        }
        .quiz-option.correct {
          background: rgba(60,180,100,0.1);
          border-color: rgba(60,180,100,0.4);
          color: #6eda98;
        }
        .quiz-option.wrong {
          background: rgba(220,60,60,0.08);
          border-color: rgba(220,60,60,0.3);
          color: #e07070;
        }
        .quiz-feedback {
          margin-top: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          padding-left: 4px;
        }
        .quiz-feedback.correct-fb { color: #6eda98; }
        .quiz-feedback.wrong-fb { color: #e07070; }

        .quiz-score {
          font-family: 'JetBrains Mono', monospace;
          font-size: 22px;
          font-weight: 700;
          color: #d4a848;
          text-align: center;
          padding: 16px;
          border: 1px solid rgba(212,168,72,0.2);
          border-radius: 10px;
          background: rgba(212,168,72,0.04);
          margin-bottom: 16px;
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 11px 22px;
          color: #a09080;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-secondary:hover {
          border-color: rgba(212,168,72,0.3);
          color: #d4a848;
        }

        .btn-ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px 24px;
          color: #706860;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-ghost:hover {
          border-color: rgba(212,168,72,0.25);
          color: #d4a848;
        }

        .results-footer {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>

      <div className="page-root">
        <div className="container">

          {/* HEADER */}
          <header className="header">
            <div className="header-eyebrow">v1.0 · AI-Powered · Adaptive Learning</div>
            <h1>Learning <span>Assistant</span></h1>
            <div className="header-line" />
          </header>

          {/* INPUT FORM */}
          <InputForm onSubmit={handleSubmit} />

          {/* TOGGLE */}
          {data && (
            <div className="toggle-bar">
              <button
                className={`toggle-btn ${showSimple ? "active" : ""}`}
                onClick={() => setShowSimple(true)}
              >
                📘 Simplified
              </button>
              <button
                className={`toggle-btn ${!showSimple ? "active" : ""}`}
                onClick={() => setShowSimple(false)}
              >
                📖 Full Explanation
              </button>
            </div>
          )}

          {/* HISTORY */}
          {history.length > 0 && (
            <div className="card">
              <div className="section-label">Recent Topics</div>
              <div className="history-chips">
                {history.map((t, i) => (
                  <button key={i} className="history-chip" onClick={() => handleSubmit(t, "6")}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="loading-bar">
              <div className="loading-dots">
                <span /><span /><span />
              </div>
              <span className="loading-text">Generating content...</span>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="error-box">
              <span>⚠</span> {error}
            </div>
          )}

          {/* RESULTS */}
          {data && (
            <>
              <Summary
                text={showSimple ? data.simplifiedSummary : data.originalSummary}
                isSimple={showSimple}
              />
              <KeyPoints points={data.keyPoints} />
              <Quiz quiz={data.quiz} />
              <div className="results-footer">
                <button onClick={handleRegenerate} className="btn-ghost">
                  ↺ Regenerate
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}