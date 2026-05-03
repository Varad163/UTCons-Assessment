type SummaryProps = {
  text: string;
  isSimple: boolean;
};

export default function Summary({ text, isSimple }: SummaryProps) {
  return (
    <div className="relative overflow-hidden bg-[#111010] border border-white/[0.07] rounded-xl px-7 py-6">

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,168,72,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative flex items-center gap-[10px] [font-family:'JetBrains_Mono',monospace] text-[10px] tracking-[0.25em] text-[#d4a848] uppercase mb-[18px]">
        {isSimple ? "Simplified Summary" : "Full Explanation"}
        <span className="flex-1 h-px bg-[rgba(212,168,72,0.2)]" />
      </div>

      <p className="relative [font-family:'Syne',sans-serif] text-[15px] leading-[1.85] text-[#c8c0b0] m-0">
        {text}
      </p>
    </div>
  );
}