import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthData } from "../../context/AuthContext";
import postLogin from "../../services/postLogin";
import fetchUserData from "../../services/fetchUserData";
import type { User } from "../../context/AuthContext";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuthData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await postLogin(username, password);
      console.log(res);

      localStorage.setItem("accessTokenFG", res.data.accessToken);

      const userData: User = await fetchUserData(res.data.accessToken);
      console.log(userData);
      setUser(userData);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
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
  );
}
