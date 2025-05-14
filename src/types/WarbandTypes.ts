export type Wizard = {
  user_id: string;
  name: string;
  wizard_class_id: number;
  primarySpellIds: number[];
  alignedSpellIds: number[];
  neutralSpellIds: number[];
  backstory: string;
};
