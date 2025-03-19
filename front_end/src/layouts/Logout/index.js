

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function LogoutForm() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('User logged out');
    setOpen(false);
    // Optional: Redirect to login or home page
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleClickOpen}
      >
        Logout
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LogoutForm;
