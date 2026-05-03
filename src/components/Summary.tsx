type SummaryProps = {
  text: string;
  isSimple: boolean;
};

export default function Summary({ text, isSimple }: SummaryProps) {
  return (
    <div style={{
      background: "#111010",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "12px",
      padding: "24px 28px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, rgba(212,168,72,0.03) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Label row â€” matches KEY POINTS / QUIZ */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        letterSpacing: "0.25em",
        color: "#d4a848",
        textTransform: "uppercase",
        marginBottom: "18px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        position: "relative",
      }}>
        {isSimple ? "Simplified Summary" : "Full Explanation"}
        <span style={{
          flex: 1,
          height: "1px",
          background: "rgba(212,168,72,0.2)",
          display: "block",
        }} />
      </div>

      {/* Summary text */}
      <p style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "15px",
        lineHeight: "1.85",
        color: "#c8c0b0",
        margin: 0,
        position: "relative",
      }}>
        {text}
      </p>
    </div>
  );
}