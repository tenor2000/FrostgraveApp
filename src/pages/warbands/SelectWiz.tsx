import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";
import { Link } from "react-router-dom";
import wizardFace from "../../assets/Game-Icons-net/wizard-face.svg";
import { useReferenceData } from "../../context/ReferenceDataContext";

export default function SelectWiz({ warbandData, setCurrWizard, currWizard }) {
  const { referenceData, loading, error } = useReferenceData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {warbandData
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .map((wizard) => {
          const isSelected = currWizard?._id === wizard._id;
          return (
            <ListItemButton
              onClick={() => setCurrWizard(wizard)}
              key={wizard._id}
              sx={{
                border: "1px solid",
                borderRadius: 2,
                minWidth: "400px",
                boxShadow: 1,
                borderColor: isSelected ? "primary.light" : "gray",
              }}
            >
              <ListItemAvatar>
                <Avatar src={wizardFace} alt={wizard.name}>
                  {wizard.name[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={wizard.name}
                secondary={`Level ${wizard.level} ${
                  getSchoolFromId(wizard.wizard_class_id, referenceData).name
                }`}
              />
            </ListItemButton>
          );
        })}
      <ListItemButton
        component={Link}
        to="/warbands/createWizard"
        sx={{
          border: "1px solid grey",
          borderRadius: 2,
          minWidth: "400px",
          boxShadow: 1,
        }}
      >
        <ListItemAvatar>
          <Avatar src={"/"} alt={"New Wizard"}>
            +
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Start a New Wizard"} />
      </ListItemButton>
    </List>
  );
}
