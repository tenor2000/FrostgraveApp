import { Box, Button, Paper, Select } from "@mui/material";
import { useState } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import StatCard from "./StatCard";
import { useWarbandData } from "../../context/WarbandDataContext";

export default function WizardPage() {
  const { referenceData, loading, error } = useReferenceData();
  const [isEditing, setIsEditing] = useState(false);
  const { currentWizard, setCurrentWizard } = useWarbandData();
  const [editedWizard, setEditedWizard] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!currentWizard) {
    return <div>Please Select a Wizard.</div>;
  }

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing && (
        <>
          <Box sx={{ margin: "auto", textAlign: "center", padding: "1rem" }}>
            <StatCard wizard={currentWizard} />
          </Box>
          <Box sx={{ margin: "auto", textAlign: "center", padding: "1rem" }}>
            <Button
              onClick={() => setIsEditing(true)}
              variant="contained"
              disabled
            >
              Edit
            </Button>
          </Box>
        </>
      )}
      {isEditing && (
        <>
          <Paper
            sx={{
              margin: "auto",
              textAlign: "center",
              padding: "1rem",
              width: "50%",
            }}
          >
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <Select></Select>
            </Box>
          </Paper>
          <Box sx={{ margin: "auto", textAlign: "center", padding: "1rem" }}>
            <Button onClick={() => setIsEditing(false)} variant="contained">
              Save
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
