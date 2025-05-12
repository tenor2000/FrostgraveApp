export function getItemFromId(id: number, refData: object) {
  return Object.values(refData)
    .flat()
    .filter((obj) => obj.item_id)
    .find((item) => item.item_id == id);
}
