import React, { useState, useReducer } from "react";
import { Box, TextField, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthData } from "../../context/AuthContext";
import { postRegister, postLogin } from "../../services/postRequests";
import { fetchUserData } from "../../services/fetchRequests";
import type { User } from "../../types/UserTypes";

type NewUser = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmpw: string;
};

const initialState: NewUser = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmpw: "",
};

export default function Register() {
  const [newUser, dispatch] = useReducer(newUserReducer, initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuthData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: e.target.name,
      payload: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (newUser.password !== newUser.confirmpw) {
      setError("Passwords do not match");
      return;
    }

    try {
      await postRegister(newUser);

      await postLogin(newUser.username, newUser.password);

      const userData: User = await fetchUserData();
      setUser(userData);
      navigate("/");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return (
    <Paper sx={{ margin: 2, padding: 2, width: "40%", mx: "auto" }}>
      <form
        onSubmit={handleRegister}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box>
          <TextField
            name="firstname"
            label="First Name"
            value={newUser.firstname}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            name="lastname"
            label="Last Name"
            value={newUser.lastname}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            name="username"
            label="Username"
            value={newUser.username}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
        </Box>
        <Box>
          <TextField
            type="email"
            name="email"
            label="Email"
            value={newUser.email}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
        </Box>
        <Box>
          <TextField
            type="password"
            name="password"
            label="Password"
            value={newUser.password}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
        </Box>
        <Box>
          <TextField
            type="password"
            name="confirmpw"
            label="Confirm Password"
            value={newUser.confirmpw}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
        </Box>
        <Box>
          <p>
            Already have an account? <Link to="/users/login">Login</Link>
          </p>
        </Box>
        {/* <div>
        <p>
          {newUser.firstname} {newUser.lastname} {newUser.username}
          {newUser.email} {newUser.password} {newUser.confirmpw}
        </p>
      </div> */}
        <Button type="submit" variant="outlined">
          Register
        </Button>
      </form>
    </Paper>
  );
}

function newUserReducer(state: NewUser, action: any) {
  switch (action.type) {
    case "firstname":
      return { ...state, firstname: action.payload };
    case "lastname":
      return { ...state, lastname: action.payload };
    case "username":
      return { ...state, username: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "confirmpw":
      return { ...state, confirmpw: action.payload };
    default:
      return state;
  }
}
