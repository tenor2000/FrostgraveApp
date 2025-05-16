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

export default function SelectWiz() {
  const { referenceData } = useReferenceData();
  const { currentWizard, setCurrentWizard } = useWarbandData();
  const { refreshData, warbandData, loading, error } = useAuthData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const onDeleteWizard = (wizard_id) => {
    setCurrentWizard(null);

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
          const isSelected = currentWizard?._id === wizard._id;
          return (
            <Box
              key={wizard._id}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "400px",
                border: "1px solid",
                borderRadius: 2,

                borderColor: isSelected ? "blue" : "gray",
                my: 1,
                backgroundColor: isSelected
                  ? "rgba(0, 0, 0, 0.8)"
                  : "rgba(0, 0, 0, 0.5)",
              }}
              variant="outlined"
            >
              <ListItemButton
                onClick={() => setCurrentWizard(wizard)}
                sx={{ flexGrow: 1 }}
              >
                <ListItemAvatar>
                  <Avatar src={wizardFace} alt={wizard.name}>
                    {wizard.name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  {wizard.name}
                  <br />
                  Level {wizard.level} -{" "}
                  {getSchoolFromId(wizard.wizard_class_id, referenceData).name}
                </ListItemText>
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
