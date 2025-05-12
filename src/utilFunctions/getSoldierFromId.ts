type refDataObj = {
  soldier_data: {
    soldier_id: number;
    type: string;
    class: string;
    move: number;
    fight: number;
    shoot: number;
    armor: number;
    will: number;
    health: number;
    cost: number;
    permItemSlots: number[];
    notes: string | null;
    source: string;
  }[];
};

export function getSchoolFromId(id: number, refData: refDataObj) {
  return refData.soldier_data.find((soldier) => soldier.soldier_id == id);
}
