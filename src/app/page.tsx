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
      {/* Only fonts + keyframe animation stay here — Tailwind cannot express these */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        @keyframes pulseDot {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1);   }
        }
        .dot1 { animation: pulseDot 1.2s ease-in-out infinite; }
        .dot2 { animation: pulseDot 1.2s ease-in-out 0.2s infinite; }
        .dot3 { animation: pulseDot 1.2s ease-in-out 0.4s infinite; }
      `}</style>

      {/* PAGE ROOT */}
      <div
        className="min-h-screen bg-[#080808] text-[#e8e2d4] [font-family:'Syne',sans-serif] px-5 pt-10 pb-20"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 40% at 50% -10%, rgba(212,168,72,0.08) 0%, transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.015) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.015) 40px)
          `,
        }}
      >
        {/* CONTAINER */}
        <div className="max-w-[780px] mx-auto flex flex-col gap-7">

          {/* ── HEADER ── */}
          <header className="text-center pt-5 pb-2">
            <p className="[font-family:'JetBrains_Mono',monospace] text-[11px] tracking-[0.3em] text-[#d4a848] uppercase opacity-80 mb-3">
              v1.0 · AI-Powered · Adaptive Learning
            </p>
            <h1 className="[font-family:'Syne',sans-serif] text-[clamp(2rem,5vw,3.2rem)] font-extrabold tracking-[-0.02em] text-[#f0ead6] leading-[1.1]">
              Learning <span className="text-[#d4a848]">Assistant</span>
            </h1>
            <div className="w-[60px] h-[2px] mx-auto mt-[18px] bg-gradient-to-r from-[#d4a848] to-transparent" />
          </header>

          {/* ── INPUT FORM ── */}
          <InputForm onSubmit={handleSubmit} />

          {/* ── TOGGLE ── */}
          {data && (
            <div className="flex bg-[#111010] border border-white/[0.07] rounded-[10px] p-[5px] gap-1">
              <button
                onClick={() => setShowSimple(true)}
                className={`flex-1 py-[10px] rounded-[7px] [font-family:'Syne',sans-serif] text-[13px] font-semibold cursor-pointer transition-all duration-200 border ${
                  showSimple
                    ? "bg-[#1a1a1a] text-[#d4a848] border-[rgba(212,168,72,0.2)]"
                    : "bg-transparent text-white/30 border-transparent"
                }`}
              >
                📘 Simplified
              </button>
              <button
                onClick={() => setShowSimple(false)}
                className={`flex-1 py-[10px] rounded-[7px] [font-family:'Syne',sans-serif] text-[13px] font-semibold cursor-pointer transition-all duration-200 border ${
                  !showSimple
                    ? "bg-[#1a1a1a] text-[#d4a848] border-[rgba(212,168,72,0.2)]"
                    : "bg-transparent text-white/30 border-transparent"
                }`}
              >
                📖 Full Explanation
              </button>
            </div>
          )}

          {/* ── HISTORY ── */}
          {history.length > 0 && (
            <div className="relative overflow-hidden bg-[#111010] border border-white/[0.07] rounded-xl px-7 py-6">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,168,72,0.03)_0%,transparent_60%)] pointer-events-none" />
              <div className="relative flex items-center gap-[10px] [font-family:'JetBrains_Mono',monospace] text-[10px] tracking-[0.25em] text-[#d4a848] uppercase mb-[10px]">
                Recent Topics
                <span className="flex-1 h-px bg-[rgba(212,168,72,0.2)]" />
              </div>
              <div className="flex flex-wrap gap-2 mt-[10px]">
                {history.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(t, "6")}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-md px-[14px] py-[6px] [font-family:'JetBrains_Mono',monospace] text-[12px] text-[#a89880] cursor-pointer transition-all duration-150 hover:bg-[rgba(212,168,72,0.08)] hover:border-[rgba(212,168,72,0.3)] hover:text-[#d4a848]"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── LOADING ── */}
          {loading && (
            <div className="flex items-center gap-[14px] px-6 py-5 bg-[#111010] border border-white/[0.07] rounded-xl">
              <div className="flex gap-[5px]">
                <span className="dot1 inline-block w-[6px] h-[6px] rounded-full bg-[#d4a848]" />
                <span className="dot2 inline-block w-[6px] h-[6px] rounded-full bg-[#d4a848]" />
                <span className="dot3 inline-block w-[6px] h-[6px] rounded-full bg-[#d4a848]" />
              </div>
              <span className="[font-family:'JetBrains_Mono',monospace] text-[13px] text-white/40">
                Generating content...
              </span>
            </div>
          )}

          {/* ── ERROR ── */}
          {error && (
            <div className="flex items-center gap-[10px] bg-[rgba(220,60,60,0.07)] border border-[rgba(220,60,60,0.2)] rounded-[10px] px-5 py-[14px] [font-family:'JetBrains_Mono',monospace] text-[13px] text-[#e07070]">
              <span>⚠</span>
              {error}
            </div>
          )}

          {/* ── RESULTS ── */}
          {data && (
            <>
              <Summary
                text={showSimple ? data.simplifiedSummary : data.originalSummary}
                isSimple={showSimple}
              />
              <KeyPoints points={data.keyPoints} />
              <Quiz quiz={data.quiz} />
              <div className="flex justify-end">
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-2 bg-transparent border border-white/[0.08] rounded-lg px-6 py-3 text-[#706860] [font-family:'Syne',sans-serif] text-[13px] font-semibold tracking-[0.04em] cursor-pointer transition-all duration-150 hover:border-[rgba(212,168,72,0.25)] hover:text-[#d4a848]"
                >
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