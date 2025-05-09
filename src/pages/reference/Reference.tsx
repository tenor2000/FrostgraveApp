import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { useNavigate } from "react-router-dom";
import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";

export default function Reference() {
  const [tabValue, setTabValue] = useState(0);
  const nav = useNavigate();
  const { refType } = useParams<{ refType: string }>();
  const { referenceData, loading, error } = useReferenceData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  // Getting refType names from the referenceData, except for spell_data
  const refTypes = Object.keys(referenceData).filter(
    (key) => key !== "spell_data"
  );

  // Sorting the list of reference data
  refTypes.sort((a, b) => a.localeCompare(b));

  // Making sure param is valid refType name
  if (refType && !refTypes.includes(refType.toLowerCase())) {
    nav("page-not-found");
  }

  // Tabs
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: isMobile ? "none" : "block" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="reference tabs"
            sx={{ overflowX: "auto" }}
          >
            <Tab
              component={Link}
              to="/reference"
              label="All"
              sx={{ fontWeight: "bold", minWidth: "100px" }}
            />
            {refTypes.map((refType: string) => (
              <Tab
                key={refType}
                component={Link}
                to={`/reference/${refType}`}
                label={refType
                  .split("_")
                  .slice(0, -1)
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
                sx={{ minWidth: "120px" }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Box>{refType ? <Box>{refType}</Box> : <Box>Blah</Box>}</Box>
    </>
  );
}
