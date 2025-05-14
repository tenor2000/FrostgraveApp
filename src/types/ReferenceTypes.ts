export type MagicSchool = {
  school_id: number;
  name: string;
  aligned: number[];
  neutral: number[];
  opposed: number[];
};

export type SpellType = {
  spell_id: number;
  name: string;
  school_id: number;
};
