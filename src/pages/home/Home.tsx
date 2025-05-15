import { useAuthData } from "../../context/AuthContext";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const { user } = useAuthData();
  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography variant="h3">Welcome, {user?.username || "Guest"}</Typography>
      <img
        src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781472834683.jpg"
        alt="frostgrave 2nd edition book cover"
        style={{ height: "60vh", width: "auto", margin: "25px" }}
      />
    </Box>
  );
}
