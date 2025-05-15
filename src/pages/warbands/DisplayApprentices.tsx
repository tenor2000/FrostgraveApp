import { Box, Button, Stack, Typography } from "@mui/material";
import StatCard from "./StatCard";
const names = [
  "Phil",
  "Ted",
  "Judy",
  "Mike",
  "Jerry",
  "Bucky",
  "Nancy",
  "Romeo",
  "Melvin",
  "Tony",
  "Rebecca",
  "Candace",
];

export default function DisplayApprentices({
  currentWizard,
  handleHireApprentice,
}) {
  if (!currentWizard) {
    return <div>Please Select a Wizard.</div>;
  }

  let apprenticesForHire = [];

  for (let i = 0; i < 3; i++) {
    let newApprentice = {
      name: names[Math.floor(Math.random() * names.length)],
      level: currentWizard?.level - 4,
      wizard_class_id: 0,
      move: 6,
      fight: currentWizard?.fight - 2,
      shoot: currentWizard?.shoot,
      armor: 10,
      will: currentWizard?.will - 2,
      health: currentWizard?.health - 2,
      cost: 0,
      statMods: {
        move: 0,
        fight: 0,
        shoot: 0,
        armor: 0,
        will: 0,
        health: 0,
      },
      itemSlots: {
        slot1: 0,
        slot2: 0,
        slot3: 0,
        slot4: 0,
      },
    };
    apprenticesForHire.push(newApprentice);
  }

  return (
    <Box sx={{ margin: "auto", textAlign: "center", padding: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Apprentices
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="stretch"
      >
        {apprenticesForHire.map((apprentice, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: 300,
              width: "100%",
              backgroundColor: "#1e1e1e",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StatCard wizard={apprentice} />

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                onClick={() => handleHireApprentice(apprentice)}
                variant="contained"
                color="success"
              >
                Hire
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
