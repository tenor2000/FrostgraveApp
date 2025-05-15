import { useReferenceData } from "../context/ReferenceDataContext";

export function getItemFromId(id: number) {
  const { referenceData } = useReferenceData();
  return Object.values(referenceData)
    .flat()
    .filter((obj) => obj.item_id)
    .find((item) => item.item_id == id);
}
