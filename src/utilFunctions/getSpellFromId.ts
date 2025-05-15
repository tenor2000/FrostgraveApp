import { useReferenceData } from "../context/ReferenceDataContext";

export function getSpellFromId(id: number) {
  const { referenceData } = useReferenceData();
  return Object.values(referenceData.spell_data).find(
    (spell) => spell.spell_id == id
  );
}
