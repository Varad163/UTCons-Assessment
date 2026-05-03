
type SummaryProps = {
  text: string;
  isSimple: boolean;
};

export default function Summary({ text, isSimple }: SummaryProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">
        {isSimple ? "📘 Simplified Summary" : "📖 Normal Explanation"}
      </h2>
      <p className="text-black">{text}</p>
    </div>
  );
}