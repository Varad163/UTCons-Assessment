// src/components/Quiz.tsx

"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";

interface QuizProps {
  quiz: QuizQuestion[];
}

export default function Quiz({ quiz }: QuizProps) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // 🎯 Calculate score
  const score = quiz.reduce((acc, q, i) => {
    return selected[i] === q.answer ? acc + 1 : acc;
  }, 0);

  // 🔄 Reset quiz
  const resetQuiz = () => {
    setSelected({});
    setSubmitted(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-3 text-black">🧠 Quiz</h2>

      {quiz.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-semibold text-black">{q.question}</p>

          {q.options.map((opt, j) => {
            const isSelected = selected[i] === opt;
            const isCorrect = q.answer === opt;

            let baseStyle =
              "block w-full text-left border px-3 py-2 mt-2 rounded transition";

            let colorStyle = "bg-white text-black";

            // 🎯 Before submit → highlight selected
            if (!submitted && isSelected) {
              colorStyle = "bg-green-200 border-green-500";
            }

            // 🎯 After submit logic
            if (submitted) {
              if (isCorrect) {
                colorStyle = "bg-green-300 border-green-600"; // correct
              } else if (isSelected && !isCorrect) {
                colorStyle = "bg-red-300 border-red-600"; // wrong
              }
            }

            return (
              <button
                key={j}
                disabled={submitted} // 🔒 lock after submit
                onClick={() =>
                  setSelected({ ...selected, [i]: opt })
                }
                className={`${baseStyle} ${colorStyle} ${
                  submitted ? "cursor-not-allowed opacity-80" : "hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            );
          })}

          {/* ✅ Feedback */}
          {submitted && (
            <p className="mt-2 font-medium">
              {selected[i] === q.answer ? (
                <span className="text-green-600">✅ Correct</span>
              ) : (
                <span className="text-red-600">
                  ❌ Wrong — Correct answer:{" "}
                  <strong>{q.answer}</strong>
                </span>
              )}
            </p>
          )}
        </div>
      ))}

      {/* 🎯 Score */}
      {submitted && (
        <p className="font-bold text-lg text-black mb-3">
          🎯 Score: {score} / {quiz.length}
        </p>
      )}

      {/* Buttons */}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Answers
        </button>
      ) : (
        <button
          onClick={resetQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          🔄 Retry Quiz
        </button>
      )}
    </div>
  );
}