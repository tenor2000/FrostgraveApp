import { Box, Button, Typography } from "@mui/material";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { useState } from "react";
import StatCard from "./StatCard";
import DisplayApprentices from "./DisplayApprentices";
import deriveApprenticeStats from "../../utilFunctions/deriveApprenticeStats";
import { useAuthData } from "../../context/AuthContext";
import { postNewApprentice } from "../../services/postRequests";
import { deleteApprentice } from "../../services/deleteRequests";

export default function ApprenticePage({ currentWizard }) {
  const { referenceData, loading, error } = useReferenceData();
  const { refreshData } = useAuthData();
  const [isHiring, setIsHiring] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!currentWizard) {
    return <div>Please Select a Wizard.</div>;
  }

  const apprentice =
    currentWizard.apprentices.length > 0
      ? deriveApprenticeStats(currentWizard.apprentices[0], currentWizard)
      : null;

  console.log(apprentice);

  const handleHireApprentice = async (apprentice) => {
    // WIP
    const newApprentice = {
      name: apprentice.name,
      wizard_id: currentWizard._id,
      status: 1,
    };
    await postNewApprentice(newApprentice);
    refreshData();
    setIsHiring(false);
  };

  const fireApprentice = async (apprentice) => {
    // WIP

    await deleteApprentice(apprentice._id);
    refreshData();
  };

  return (
    <Box sx={{ margin: "auto", textAlign: "center", padding: "1rem" }}>
      {!apprentice && !isHiring && (
        <Box>
          <Typography>{currentWizard.name} has no Apprentice.</Typography>
          <Button onClick={() => setIsHiring(true)} variant="outlined">
            Hire Apprentice
          </Button>
        </Box>
      )}
      {!apprentice && isHiring && (
        <Box>
          <Typography>{currentWizard.name} is hiring an Apprentice.</Typography>
          <DisplayApprentices
            currentWizard={currentWizard}
            handleHireApprentice={handleHireApprentice}
          />
        </Box>
      )}
      {apprentice && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="h5">
            {currentWizard.name}'s Apprentice
          </Typography>
          <StatCard wizard={apprentice} />
          <Box>
            <Button
              onClick={() => fireApprentice(apprentice)}
              variant="outlined"
              color="error"
            >
              Fire
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
