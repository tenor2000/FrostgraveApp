import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { putUser } from "../../services/putRequests";
import { deleteUser } from "../../services/deleteRequests";
import { useAuthData } from "../../context/AuthContext";

export default function Profile() {
  const { user, refreshData, logout, loading, error } = useAuthData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormData({ name: user?.name || "", email: user?.email || "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user._id);
      logout();
      navigate("/");
    } catch {
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putUser(localStorage.getItem("accessTokenFG") || "", formData);
      // If you have a way to update user in context, use that here:
      // setUser(res.data);
      setSnackbar({
        open: true,
        message: "Profile updated!",
        severity: "success",
      });
      setIsEditing(false);
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to update profile.",
        severity: "error",
      });
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!user) return <div className="p-4">No user data.</div>;

  return (
    <Box maxWidth="sm" mx="auto" mt={10} component={Paper} p={4} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Your Profile
      </Typography>

      {!isEditing ? (
        <>
          <Typography>
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditToggle}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
            >
              Delete Account
            </Button>
          </Box>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
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
            <Box display="flex" gap={2} mt={2}>
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

      {/* Delete Confirmation Modal */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is irreversible. Are you sure you want to delete your
            account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
