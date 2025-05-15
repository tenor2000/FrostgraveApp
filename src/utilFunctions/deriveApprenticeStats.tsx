export default function deriveApprenticeStats(apprentice, wizard) {
  //WIP not implemented
  return {
    ...apprentice,
    armor: 10,
    health: wizard.health - 2,
    move: 6,
    fight: wizard.fight - 2,
    will: wizard.will - 2,
    shoot: wizard.shoot,
    wizard_class_id: 0,
    level: wizard.level - 4,
  };
}
