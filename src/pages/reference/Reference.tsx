import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { useNavigate } from "react-router-dom";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ArmorComponent from "./Armor";
import CreaturesComponent from "./Creature";
import SoldiersComponent from "./Soldier";
import WeaponsComponent from "./Weapon";
import LocationComponent from "./Base_Location";
import SchoolComponent from "./Magic_School";
import ResourceComponent from "./Base_Resource";

const components = {
  armor: <ArmorComponent />,
  creature: <CreaturesComponent />,
  soldier: <SoldiersComponent />,
  weapon: <WeaponsComponent />,
  base_location: <LocationComponent />,
  magic_school: <SchoolComponent />,
  base_resource: <ResourceComponent />,
};

export default function Reference() {
  const [tabValue, setTabValue] = useState(0);
  const nav = useNavigate();
  const { refType } = useParams<{ refType: string }>(); // refType comes in as '(name_of_refType)_data'
  const { referenceData, loading, error } = useReferenceData();

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
      <Box sx={{ padding: "1rem", marginBottom: "1rem" }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="reference tabs"
            sx={{ overflowX: "auto", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <Tab
              component={Link}
              to="/reference"
              label="All"
              sx={{ fontWeight: "bold", minWidth: "100px", color: "white" }}
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
                sx={{ minWidth: "120px", color: "white" }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Box>
        {refType ? (
          components[refType.split("_").slice(0, -1).join("_")]
        ) : (
          <Box>
            <img
              src="https://www.ospreypublishing.com/media/_osprey-blog-legacy/FGV_Minis.jpg"
              alt="Frostgrave pics"
              style={{ height: "60vh", width: "auto", margin: "25px" }}
            />
            <Typography variant="h4">
              Please Select a Reference Type to View
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
