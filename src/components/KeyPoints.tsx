type KeyPointsProps = {
  points: string[];
};

export default function KeyPoints({ points }: KeyPointsProps) {
  return (
    <div className="relative overflow-hidden bg-[#111010] border border-white/[0.07] rounded-xl px-7 py-6">
   
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,168,72,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative flex items-center gap-[10px] [font-family:'JetBrains_Mono',monospace] text-[10px] tracking-[0.25em] text-[#d4a848] uppercase mb-4">
        Key Points
        <span className="flex-1 h-px bg-[rgba(212,168,72,0.2)]" />
      </div>

      <ul className="relative flex flex-col gap-[10px] list-none m-0 p-0">
        {points.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-3 px-[14px] py-3 bg-white/[0.02] border border-white/[0.05] rounded-lg [font-family:'Syne',sans-serif] text-[14px] leading-[1.6] text-[#c0b8a8] transition-colors duration-150 hover:border-[rgba(212,168,72,0.15)]"
          >
            <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] text-[#d4a848] opacity-70 pt-[2px] min-w-[20px] shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}