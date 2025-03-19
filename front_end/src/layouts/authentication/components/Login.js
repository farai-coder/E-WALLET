import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth hook
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Typography
} from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import axios from 'axios'; // Import axios for making API requests
import api from 'Api';
import { BASE_URL } from 'Api';

const LoginModal = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Destructure login from useAuth
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

   

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, 
        `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`, 
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      // Assuming the response contains an access token or user info
      if (response.data) {
        console.log('Login successful:', response.data);
        login('user'); // Call login from context (assuming successful login)
        // Show success alert
        alert('Login successful!');
        setError('');
        onClose(); // Close the modal on successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  // Handle closing the modal
  const handleClose = () => {
    onClose(); // Call the parent close handler
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePasswords(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswords(password, e.target.value);
  };

  const validatePasswords = (password, confirmPassword) => {
    let passwordError = '';
    let confirmPasswordError = '';

    setErrors({
      password: password ? '' : 'Password is required',
      confirmPassword: confirmPassword ? confirmPasswordError : 'Confirm Password is required'
    });
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          // Prevent closing the modal on backdrop click or ESC key press
          return;
        }
        onClose();
      }}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="login-modal-title">Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" error={Boolean(error)}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && <FormHelperText>{error}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
