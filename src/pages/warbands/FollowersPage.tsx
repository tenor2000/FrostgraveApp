import { Box, Typography } from "@mui/material";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";
import { useReferenceData } from "../../context/ReferenceDataContext";
import StatCard from "./StatCard";

export default function FollowersPage({ currentWizard }) {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!currentWizard) {
    return <div>Please Select a Wizard.</div>;
  }

  const followers = currentWizard?.followers || null;
  console.log(followers);

  if (followers.length === 0) {
    return <div>{currentWizard.name} has no Followers</div>;
  }

  return (
    <Box sx={{ margin: "auto", textAlign: "center", padding: "1rem" }}>
      {/* <StatCard wizard={apprentice} /> */}
    </Box>
  );
}
