import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthData } from "../../context/AuthContext";
import { postLogin } from "../../services/postRequests";
import { fetchUserData } from "../../services/fetchRequests";
import type { User } from "../../types/UserTypes";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { setToken } from "../../services/authToken";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser, refreshData } = useAuthData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await postLogin(username, password);
      console.log(res.data);

      setToken(res.data.accessToken);
      const userData: User = await fetchUserData();
      setUser(userData);

      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Paper sx={{ margin: 2, padding: 2, width: "30%", mx: "auto" }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ maxWidth: "400px", margin: "auto" }}
      >
        <Typography variant="h2">Login</Typography>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box sx={{ margin: "10px" }}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ margin: "10px" }}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button type="submit" variant="outlined">
          Login
        </Button>
        <Typography sx={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/users/register">Register</Link>
        </Typography>
      </Box>
    </Paper>
  );
}
