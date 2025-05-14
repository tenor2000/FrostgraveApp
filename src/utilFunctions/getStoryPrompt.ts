export default function getStoryPrompt() {
  const prompts = [
    "Growing up in an orphanage, you never expected to study magic...",
    "Life as a farmer was never in the cards for you...",
    "You were born into a family of thieves until one day an old man arrived in town...",
    "You were dead set on a life of adventure, however...",
    "Always the studious one, you learned magic as a child...",
    "When you were a child, you were always fascinated by the mysteries of the arcane...",
    "A humble apprentice in an apothecary, you were unexpectedly discovered by...",
    "Fresh out of University of Mystery and Wonderment, you graduated near the bottom of your class, however...",
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
}
