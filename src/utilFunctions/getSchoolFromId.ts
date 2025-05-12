type refDataObj = {
  magic_school_data: {
    school_id: number;
    name: string;
    nicknames: string[];
    aligned: number[];
    neutral: number[];
    opposed: number[];
  }[];
};

export function getSchoolFromId(id: number, refData: refDataObj) {
  return refData.magic_school_data.find((school) => school.school_id == id);
}
