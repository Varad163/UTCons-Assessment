// src/components/InputForm.tsx

"use client";

import { useState } from "react";

type InputFormProps = {
  onSubmit: (topic: string, grade: string) => void;
};

export default function InputForm({ onSubmit }: InputFormProps) {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <input
        placeholder="Enter topic (e.g. Photosynthesis)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <input
        placeholder="Enter grade (e.g. 6)"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <button
        onClick={() => onSubmit(topic, grade)}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Generate 🚀
      </button>
    </div>
  );
}