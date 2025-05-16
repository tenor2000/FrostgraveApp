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
import { useWarbandData } from "../../context/WarbandDataContext";
import { useNavigate } from "react-router-dom";

export default function ApprenticePage() {
  const { referenceData, loading, error } = useReferenceData();
  const { refreshData, warbandData } = useAuthData();
  const { currentWizard, setCurrentWizard } = useWarbandData();
  const [isHiring, setIsHiring] = useState(false);

  const navigate = useNavigate();

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

  const handleHireApprentice = async (apprentice) => {
    // WIP
    const newApprentice = {
      name: apprentice.name,
      wizard_id: currentWizard._id,
      status: 1,
    };
    await postNewApprentice(newApprentice);
    refreshData();
    navigate("/warbands");
    setIsHiring(false);
  };

  const fireApprentice = (apprentice) => {
    // WIP
    console.log("fireApprentice Triggers!");

    try {
      setCurrentWizard(null);
      deleteApprentice(apprentice._id);
      console.log("Apprentice deleted");

      refreshData();
      navigate("/warbands");
    } catch (err: any) {
      console.error("Error in fireApprentice:", err);
    }
  };

  return (
    <Box sx={{ margin: "auto", textAlign: "center", padding: "1rem" }}>
      {!apprentice && !isHiring && (
        <Box
          sx={{
            margin: "auto",
            textAlign: "center",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography variant="h4">
            {currentWizard.name} has no Apprentice.
          </Typography>
          <Box>
            <Button onClick={() => setIsHiring(true)} variant="contained">
              Hire An Apprentice
            </Button>
          </Box>
        </Box>
      )}
      {!apprentice && isHiring && (
        <Box>
          <Typography variant="h4">
            {currentWizard.name} is hiring an Apprentice.
          </Typography>
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
              onClick={() => {
                console.log("fire Apprentice");
                fireApprentice(apprentice);
              }}
              variant="contained"
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
