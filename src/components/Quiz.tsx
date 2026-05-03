
"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";

interface QuizProps {
  quiz: QuizQuestion[];
}

export default function Quiz({ quiz }: QuizProps) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">🧠 Quiz</h2>

      {quiz.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium">{q.question}</p>

          {q.options.map((opt, j) => (
            <button
              key={j}
              onClick={() => setSelected({ ...selected, [i]: opt })}
              className="block w-full text-left border px-3 py-2 mt-1 rounded hover:bg-gray-100"
            >
              {opt}
            </button>
          ))}

          {submitted && (
            <p className="mt-1">
              {selected[i] === q.answer ? "✅ Correct" : "❌ Wrong"}
            </p>
          )}
        </div>
      ))}

      <button
        onClick={() => setSubmitted(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Answers
      </button>
    </div>
  );
}