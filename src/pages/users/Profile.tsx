import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { putUser } from "../../services/putRequests";
import { deleteUser } from "../../services/deleteRequests";
import { useAuthData } from "../../context/AuthContext";

export default function Profile() {
  const { user, refreshData, logout, loading, error } = useAuthData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!user) {
    return <p>No user data.</p>;
  }

  console.log(user);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormData({
      _id: user?._id || "",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      username: user?.username || "",
      email: user?.email || "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putUser(formData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsEditing(false);
      refreshData();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user._id);
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper sx={{ margin: 2, padding: 2, width: "30%", mx: "auto" }}>
      <Typography variant="h5">User Profile</Typography>

      {!isEditing ? (
        <>
          <Typography>
            <strong>First Name:</strong> {user.firstname}
          </Typography>
          <Typography>
            <strong>Last Name:</strong> {user.lastname}
          </Typography>
          <Typography>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Button variant="contained" onClick={handleEditToggle}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete Account
            </Button>
          </Box>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              <Button type="submit" variant="contained" color="success">
                Save Changes
              </Button>
              <Button variant="outlined" onClick={handleEditToggle}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Paper>
  );
}
