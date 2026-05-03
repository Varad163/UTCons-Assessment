"use client";

import { useState } from "react";

type InputFormProps = {
  onSubmit: (topic: string, grade: string) => void;
};

export default function InputForm({ onSubmit }: InputFormProps) {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <div className="card">
      <div className="section-label">New Topic</div>
      <div className="input-grid">
        <div className="field">
          <input
            placeholder="Topic — e.g. Photosynthesis, Black Holes…"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit(topic, grade)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
      </div>
      <button className="btn-primary" onClick={() => onSubmit(topic, grade)}>
        <span>Generate</span>
        <span style={{ fontSize: "16px" }}>→</span>
      </button>
    </div>
  );
}