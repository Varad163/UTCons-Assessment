type KeyPointsProps = {
  points: string[];
};

export default function KeyPoints({ points }: KeyPointsProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">📌 Key Points</h2>
      <ul className="list-disc ml-5 space-y-1">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}