"use client";

import { useState } from "react";

type InputFormProps = {
  onSubmit: (topic: string, grade: string) => void;
};

export default function InputForm({ onSubmit }: InputFormProps) {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <div className="relative overflow-hidden bg-[#111010] border border-white/[0.07] rounded-xl px-7 py-6">

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,168,72,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative flex items-center gap-[10px] [font-family:'JetBrains_Mono',monospace] text-[10px] tracking-[0.25em] text-[#d4a848] uppercase mb-4">
        New Topic
        <span className="flex-1 h-px bg-[rgba(212,168,72,0.2)]" />
      </div>

      <div className="relative grid grid-cols-[1fr_120px] max-[500px]:grid-cols-1 gap-3 mb-[14px]">
        <input
          placeholder="Topic — e.g. Photosynthesis, Black Holes…"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit(topic, grade)}
          className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-[13px] text-[#e8e2d4] [font-family:'Syne',sans-serif] text-[14px] outline-none transition-all duration-200 placeholder:text-white/20 focus:border-[rgba(212,168,72,0.5)] focus:shadow-[0_0_0_3px_rgba(212,168,72,0.06)]"
        />
        <input
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-[13px] text-[#e8e2d4] [font-family:'Syne',sans-serif] text-[14px] outline-none transition-all duration-200 placeholder:text-white/20 focus:border-[rgba(212,168,72,0.5)] focus:shadow-[0_0_0_3px_rgba(212,168,72,0.06)]"
        />
      </div>

      <button
        onClick={() => onSubmit(topic, grade)}
        className="relative w-full flex items-center justify-center gap-2 bg-[#d4a848] text-[#080808] border-none rounded-lg py-[13px] px-5 [font-family:'Syne',sans-serif] text-[14px] font-bold tracking-[0.03em] cursor-pointer transition-all duration-200 hover:bg-[#e0b85a] hover:shadow-[0_4px_24px_rgba(212,168,72,0.25)] active:scale-[0.98]"
      >
        <span>Generate</span>
        <span className="text-[16px]">→</span>
      </button>
    </div>
  );
}