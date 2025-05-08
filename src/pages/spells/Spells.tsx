import { useParams } from "react-router-dom";

export default function Reference() {
  const { school } = useParams();

  return (
    <div>
      <h2>Spells</h2>
      {school && <h3>{school}</h3>}
    </div>
  );
}
