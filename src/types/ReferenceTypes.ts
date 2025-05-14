export type MagicSchool = {
  school_id: number;
  name: string;
  aligned: number[];
  neutral: number[];
  opposed: number[];
};

// export type SpellType = {
//   spell_id: number;
//   name: string;
//   school_id: number;
// };

export type SpellType = {
  _id: string;
  spell_id: number;
  name: string;
  school_id: number;
  base_cast: number;
  category: string;
  description: string;
};
