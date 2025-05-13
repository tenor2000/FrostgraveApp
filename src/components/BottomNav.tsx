import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

export default function MobileBottomNav() {
  const [value, setValue] = React.useState("reference");
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  return (
    <BottomNavigation
      sx={{ width: "100vw" }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Reference"
        value="reference"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Spells"
        value="spells"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Warbands"
        value="warbands"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="Campaigns"
        value="campaigns"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}
