import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useRegisterUserMutation } from "../../apislice/authApiSlice";
import { extractErrorMessage } from "../../util/extractErrorMessage";

export default function CreateUserPage() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      toast.success("User created successfully!");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create User"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
