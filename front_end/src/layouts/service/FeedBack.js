import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: '16px',
  marginBottom: '16px',
  boxShadow: theme.shadows[4],
  borderRadius: '12px',
  backgroundColor: '#ffffff',
}));

const Feedback = () => {
  const [providerName, setProviderName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log('Feedback submitted:', { providerName, feedback });
    // Reset the form
    setProviderName('');
    setFeedback('');
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1A35FF', marginBottom: 2 }}>
        Submit Your Feedback
      </Typography>
      <StyledCard>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Service Provider Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              required
            />
            <TextField
              label="Your Feedback"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }} className=' text-white'>
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Feedback;
