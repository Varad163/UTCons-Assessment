type KeyPointsProps = {
  points: string[];
};

export default function KeyPoints({ points }: KeyPointsProps) {
  return (
    <div className="card">
      <div className="section-label">Key Points</div>
      <ul className="key-points-list">
        {points.map((p, i) => (
          <li key={i} className="key-point-item">
            <span className="key-point-num">{String(i + 1).padStart(2, "0")}</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}