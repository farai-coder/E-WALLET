// FeedbackForm.js
import React, { useState } from 'react';
import { Drawer, IconButton, TextField, Button, Typography, Box, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function FeedbackForm({ open, onClose }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Feedback submitted:', feedback);
    setFeedback(''); // Clear the form after submission
    onClose(); // Close the form
  };

  return (
    <Drawer
    BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400, // Width of the drawer
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxShadow: 24,
        },
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={onClose}
        sx={{ alignSelf: 'flex-end', marginBottom: 2 }}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Customer Feedback
        </Typography>
        <Typography variant="body2" gutterBottom>
          We value your feedback. Please let us know how  
        </Typography>
        <Typography variant="body2" gutterBottom>
          we can improve.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="Your Feedback"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" className='text-white' fullWidth sx={{ marginTop: 2 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default FeedbackForm;
