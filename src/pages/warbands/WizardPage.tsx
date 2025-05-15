import { Box, Typography } from "@mui/material";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";
import { useReferenceData } from "../../context/ReferenceDataContext";
import StatCard from "./StatCard";

export default function WizardPage({ currentWizard }) {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!currentWizard) {
    return <div>Please Choose a Wizard.</div>;
  }

  return (
    <Box sx={{ margin: "auto", textAlign: "center", padding: "1rem" }}>
      <StatCard wizard={currentWizard} />
    </Box>
  );
}
