"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";

interface QuizProps {
  quiz: QuizQuestion[];
}

export default function Quiz({ quiz }: QuizProps) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // 🎯 FIXED SCORE
  const score = quiz.reduce((acc, q, i) => {
    const correctAnswerText =
      q.options[q.answer.charCodeAt(0) - 65];

    return selected[i] === correctAnswerText ? acc + 1 : acc;
  }, 0);

  const resetQuiz = () => {
    setSelected({});
    setSubmitted(false);
  };

  return (
    <div className="card">
      <div className="section-label">Quiz</div>

      {quiz.map((q, i) => {
        // ✅ Convert A/B/C/D → actual option text
        const correctAnswerText =
          q.options[q.answer.charCodeAt(0) - 65];

        return (
          <div key={i} className="quiz-question">
            <p className="quiz-q-text">
              {i + 1}. {q.question}
            </p>

            {q.options.map((opt, j) => {
              const isSelected = selected[i] === opt;
              const isCorrect = opt === correctAnswerText;

              let cls = "quiz-option";

              if (!submitted && isSelected) cls += " selected";

              if (submitted) {
                if (isCorrect) cls += " correct";
                else if (isSelected && !isCorrect) cls += " wrong";
              }

              return (
                <button
                  key={j}
                  disabled={submitted}
                  onClick={() =>
                    setSelected({ ...selected, [i]: opt })
                  }
                  className={cls}
                >
                  {opt}
                </button>
              );
            })}

            {/* ✅ FIXED FEEDBACK */}
            {submitted && (
              <p
                className={`quiz-feedback ${
                  selected[i] === correctAnswerText
                    ? "correct-fb"
                    : "wrong-fb"
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

      {/* ✅ FIXED SCORE */}
      {submitted && (
        <div className="quiz-score">
          {score} / {quiz.length} correct
        </div>
      )}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="btn-primary"
          style={{ maxWidth: "200px" }}
        >
          Submit Answers
        </button>
      ) : (
        <button onClick={resetQuiz} className="btn-secondary">
          ↺ Retry Quiz
        </button>
      )}
    </div>
  );
}