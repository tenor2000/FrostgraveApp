import { Box, Tabs, Tab, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthData } from "../../context/AuthContext";
import { useWarbandData } from "../../context/WarbandDataContext";
import WizardPage from "./WizardPage";
import SelectWiz from "./SelectWiz";
import Spellbook from "./Spellbook";
import ApprenticePage from "./ApprenticePage";
import FollowersPage from "./FollowersPage";

export default function Warbands() {
  const { user, loading, error } = useAuthData();
  const [tabValue, setTabValue] = useState(0);
  const { warbandData } = useAuthData();
  const { section } = useParams<{ section: string }>();
  const { currentWizard, setCurrentWizard } = useWarbandData();

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error.message}</p>;

  const tabHeadings = ["Wizard", "Spellbook", "Apprentice", "Followers"];

  if (!user) {
    return (
      <Box>
        <Typography>Warbands</Typography>
        <p>Please log in to view your warbands.</p>
        <Link to="/users/login">Login</Link>
      </Box>
    );
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: "1rem", marginBottom: "1rem" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="warband tabs"
            allowScrollButtonsMobile
            sx={{ bgcolor: "rgba(0, 0, 0, 0.5)" }}
          >
            <Tab
              component={Link}
              to="/warbands"
              label="Select"
              sx={{
                fontWeight: "bold",
                minWidth: "100px",
                color: "white",
              }}
            />
            {tabHeadings.map((heading: string) => (
              <Tab
                key={heading}
                component={Link}
                to={`/warbands/${heading.toLowerCase()}`}
                label={heading}
                sx={{ fontWeight: "bold", minWidth: "100px", color: "white" }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ paddingTop: "1rem" }}>
        {!section && <SelectWiz />}
        {section === "wizard" && <WizardPage currentWizard={currentWizard} />}
        {section === "spellbook" && <Spellbook currentWizard={currentWizard} />}
        {section === "apprentice" && <ApprenticePage />}
        {section === "followers" && (
          <FollowersPage currentWizard={currentWizard} />
        )}
      </Box>
    </Box>
  );
}
