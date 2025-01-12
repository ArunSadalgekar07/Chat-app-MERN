import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { bgGradient } from "../../constants/color";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8', // Calm background color
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <form
          style={{
            width: '100%',
            marginTop: '1rem',
          }}
          onSubmit={submitHandler}
        >
          <TextField
            required
            fullWidth
            label="Secret Key"
            type="password"
            margin="normal"
            variant="outlined"
            value={secretKey.value}
            onChange={secretKey.changeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
