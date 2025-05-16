export type ItemSlots = {
  slot1: number;
  slot2: number;
  slot3: number;
  slot4: number;
  slot5: number;
};

export type StatMods = {
  move: number;
  fight: number;
  shoot: number;
  armor: number;
  will: number;
  health: number;
};

export type Wizard = {
  _id?: string;
  user_id: string;
  name: string;
  wizard_class_id: number;
  level: number;
  health: number;
  currentHealth: number;
  move: number;
  fight: number;
  shoot: number;
  armor: number;
  will: number;
  cost: number;
  status: number;
  itemSlots: ItemSlots;
  statMods: StatMods;
  gold: number;
  primarySpellIds: number[];
  alignedSpellIds: number[];
  neutralSpellIds: number[];
  opposedSpellIds: number[];
  spellModifiers: Record<string, number>;
  soldiersLost: number;
  xp: number;
  xpSpent: number;
  vaultItems: number[];
  base: number | null;
  currentScenario: string | null;
  careerHistory: string[];
  backstory: string | null;
};

export type WizardCreation = {
  user_id: string;
  name: string;
  wizard_class_id: number;
  primarySpellIds: number[];
  alignedSpellIds: number[];
  neutralSpellIds: number[];
  backstory: string;
};

export type Follower = {
  _id?: string;
  wizard_id: string;
  rosterPosition: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  name: string;
  status: 0 | 1 | 2 | 7 | 8 | 9;
  soldier_id: number;
  itemSlots: {
    slot1: number;
  };
  rosterState: 1 | 2 | 3;
};

export type Apprentice = {
  _id?: string;
  wizard_id: string;
  name: string;
  class?: string;
  status: 0 | 1 | 2 | 7 | 8 | 9;
  armor: number;
  itemSlots: {
    slot1: number;
    slot2: number;
    slot3: number;
    slot4: number;
  };
  cost: number;
  statMods: {
    move: number;
    fight: number;
    shoot: number;
    armor: number;
    will: number;
    health: number;
  };
};

export type ApprenticeCreation = {
  wizard_id: string;
  name: string;
};
