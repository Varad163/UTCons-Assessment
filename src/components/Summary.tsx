type SummaryProps = {
  text: string;
};

export default function Summary({ text }: SummaryProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">📘 Simplified Summary</h2>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}