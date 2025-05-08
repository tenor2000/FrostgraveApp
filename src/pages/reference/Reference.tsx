import { useParams } from "react-router-dom";

export default function Reference() {
  const { type } = useParams();

  return (
    <div>
      <h2>Reference</h2>
      {type && <h3>{type}</h3>}
    </div>
  );
}
