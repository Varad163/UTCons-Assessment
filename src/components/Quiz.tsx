"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";

interface QuizProps {
  quiz: QuizQuestion[];
}

export default function Quiz({ quiz }: QuizProps) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = quiz.reduce((acc, q, i) => {
    const correctAnswerText =
      q.options[q.answer.charCodeAt(0) - 65];

    return selected[i] === correctAnswerText ? acc + 1 : acc;
  }, 0);

  const resetQuiz = () => {
    setSelected({});
    setSubmitted(false);
  };

  const getOptionClass = (opt: string, q: QuizQuestion, i: number) => {
    const correctAnswerText =
      q.options[q.answer.charCodeAt(0) - 65];

    const isSelected = selected[i] === opt;
    const isCorrect = opt === correctAnswerText;

    const base =
      "block w-full text-left border rounded-lg px-4 py-[10px] mt-2 [font-family:'Syne',sans-serif] text-[14px] cursor-pointer transition-all duration-150 disabled:cursor-not-allowed";

    if (submitted && isCorrect)
      return `${base} bg-[rgba(60,180,100,0.1)] border-[rgba(60,180,100,0.4)] text-[#6eda98]`;

    if (submitted && isSelected && !isCorrect)
      return `${base} bg-[rgba(220,60,60,0.08)] border-[rgba(220,60,60,0.3)] text-[#e07070]`;

    if (!submitted && isSelected)
      return `${base} bg-[rgba(212,168,72,0.1)] border-[rgba(212,168,72,0.4)] text-[#d4a848]`;

    return `${base} bg-white/[0.02] border-white/[0.07] text-[#b0a898] hover:bg-[rgba(212,168,72,0.05)] hover:border-[rgba(212,168,72,0.25)] hover:text-[#e0d8c8]`;
  };

  return (
    <div className="relative overflow-hidden bg-[#111010] border border-white/[0.07] rounded-xl px-7 py-6">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,168,72,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative flex items-center gap-[10px] [font-family:'JetBrains_Mono',monospace] text-[10px] tracking-[0.25em] text-[#d4a848] uppercase mb-5">
        Quiz
        <span className="flex-1 h-px bg-[rgba(212,168,72,0.2)]" />
      </div>

      <div className="relative">
        {quiz.map((q, i) => {
          const correctAnswerText =
            q.options[q.answer.charCodeAt(0) - 65];

          return (
            <div key={i} className="mb-[26px] last:mb-0">
              <p className="[font-family:'Syne',sans-serif] text-[15px] font-semibold text-[#e0d8c8] mb-3 pl-3 border-l-2 border-[#d4a848]">
                {i + 1}. {q.question}
              </p>

              {q.options.map((opt, j) => (
                <button
                  key={j}
                  disabled={submitted}
                  onClick={() =>
                    setSelected({ ...selected, [i]: opt })
                  }
                  className={getOptionClass(opt, q, i)}
                >
                  {opt}
                </button>
              ))}
              {submitted && (
                <p
                  className={`mt-[10px] [font-family:'JetBrains_Mono',monospace] text-[12px] pl-1 ${
                    selected[i] === correctAnswerText
                      ? "text-[#6eda98]"
                      : "text-[#e07070]"
                  }`}
                >
                  {selected[i] === correctAnswerText
                    ? "✓ Correct"
                    : `✗ Correct answer: ${correctAnswerText}`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {submitted && (
        <div className="[font-family:'JetBrains_Mono',monospace] text-[22px] font-bold text-[#d4a848] text-center py-4 px-4 border border-[rgba(212,168,72,0.2)] rounded-[10px] bg-[rgba(212,168,72,0.04)] mb-4 mt-6">
          {score} / {quiz.length} correct
        </div>
      )}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="flex items-center justify-center gap-2 bg-[#d4a848] text-[#080808] border-none rounded-lg py-[13px] px-5 [font-family:'Syne',sans-serif] text-[14px] font-bold tracking-[0.03em] cursor-pointer transition-all duration-200 hover:bg-[#e0b85a] hover:shadow-[0_4px_24px_rgba(212,168,72,0.25)] active:scale-[0.98] mt-2 min-w-[180px]"
        >
          Submit Answers
        </button>
      ) : (
        <button
          onClick={resetQuiz}
          className="bg-transparent border border-white/[0.12] rounded-lg px-[22px] py-[11px] text-[#a09080] [font-family:'Syne',sans-serif] text-[13px] font-semibold cursor-pointer transition-all duration-150 hover:border-[rgba(212,168,72,0.3)] hover:text-[#d4a848]"
        >
          ↺ Retry Quiz
        </button>
      )}
    </div>
  );
}