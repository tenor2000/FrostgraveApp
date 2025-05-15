import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthData } from "../../context/AuthContext";

export default function Warbands() {
  const { user, loading, error } = useAuthData();
  const { warbandData } = useAuthData();

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error.message}</p>;
  console.log(warbandData);

  if (!user) {
    return (
      <Box>
        <Typography>Warbands</Typography>
        <Link to="/users/login">Login</Link>
      </Box>
    );
  }

  return (
    <Box>
      <Typography>Warbands</Typography>
      {user && <p>{user.username}</p>}
      {warbandData &&
        warbandData
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
          .map((wizard) => <p key={wizard._id}>{wizard.name}</p>)}

      <Link to="/warbands/createWizard">New Wizard</Link>
    </Box>
  );
}
