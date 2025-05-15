import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
} from "@mui/material";
import { getSchoolFromId } from "../../utilFunctions/getSchoolFromId";
import { Link } from "react-router-dom";
import wizardFace from "../../assets/Game-Icons-net/wizard-face.svg";
import { useReferenceData } from "../../context/ReferenceDataContext";
import { useWarbandData } from "../../context/WarbandDataContext";
import { useAuthData } from "../../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteWizard } from "../../services/deleteRequests";

export default function SelectWiz({ warbandData }) {
  const { referenceData, loading, error } = useReferenceData();
  const { currWizard, setCurrWizard } = useWarbandData();
  const { refreshData } = useAuthData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const onDeleteWizard = (wizard_id) => {
    setCurrWizard(null);

    deleteWizard(wizard_id);
    refreshData();
  };

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
            <Box
              key={wizard._id}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "400px",
                borderRadius: 2,
                boxShadow: 1,
                borderColor: isSelected ? "blue" : "gray",
                my: 1,
              }}
              variant="outlined"
            >
              <ListItemButton
                onClick={() => setCurrWizard(wizard)}
                sx={{ flexGrow: 1 }}
              >
                <ListItemAvatar>
                  <Avatar src={wizardFace} alt={wizard.name}>
                    {wizard.name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={wizard.name}
                  secondary={`Level ${wizard.level} ${
                    getSchoolFromId(wizard.wizard_class_id, referenceData)?.name
                  }`}
                />
              </ListItemButton>
              <IconButton
                // edge="end"
                color="error"
                aria-label="delete"
                onClick={() => onDeleteWizard(wizard._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
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
          my: 1,
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
