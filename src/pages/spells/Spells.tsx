import { useParams } from "react-router-dom";
import { useReferenceData } from "../../context/ReferenceDataContext";
import BasicAccordian from "../../components/BasicAccordian";
import BasicSpellCard from "./BasicSpellCard";

type Spell = {
  _id: string;
  spell_id: number;
  name: string;
  school: string;
  base_cast: number;
  category: string;
  description: string;
};

export default function Reference() {
  const { school } = useParams<{ school: string }>();
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const spellData: Spell[] = referenceData.spell_data.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const schooltypes = [
    ...new Set(spellData.map((spell: Spell) => spell.school.toLowerCase())),
  ];

  return (
    <div>
      <h2>Spells</h2>
      {!school &&
        spellData.map((spell: Spell) => (
          <BasicAccordian title={spell.name} key={spell._id}>
            <BasicSpellCard spellObj={spell} titlebar={false} />
          </BasicAccordian>
        ))}
      {school && <h3>{school}</h3>}
    </div>
  );
}
