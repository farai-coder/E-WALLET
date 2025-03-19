import React, { useState } from 'react';
import { IconButton, Drawer, Typography, TextField, Button, Rating, Box, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RateUsDrawer = ({ open, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    onClose(); // Close drawer after submission
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
      sx={{ '& .MuiDrawer-paper': { width: 400 } }} // Adjust width here
      PaperProps={{
        sx: {
          boxShadow: 24,
        },
      }}
    >
      <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Rate Us</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={handleRatingChange}
            sx={{ mb: 2 }}
          />
        </Box>
        <TextField
          label="Leave a comment"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" className="text-white" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Drawer>
  );
};

export default RateUsDrawer;
