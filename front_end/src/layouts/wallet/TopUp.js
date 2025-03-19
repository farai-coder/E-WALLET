import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';

function TopUpWallet() {
  const [amount, setAmount] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTopUp = () => {
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      // Here you would typically send the amount to your API
      setSnackbarMessage(`Successfully topped up $${amount} to your wallet!`);
      setSnackbarOpen(true);
      setAmount('');
    } else {
      setSnackbarMessage('Please enter a valid amount.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f6f8' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2, backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1A35FF' }}>
                <MonetizationOn sx={{ fontSize: 50, mr: 1 }} />
                Top Up Wallet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 3, fontSize: '1.1rem' }}>
                Increase your wallet balance by entering the amount below.
              </Typography>
              <TextField
                label="Amount to Top Up"
                variant="outlined"
                fullWidth
                type="number"
                value={amount}
                onChange={handleAmountChange}
                sx={{ mb: 2 }}
                inputProps={{ style: { fontSize: '1.2rem' } }} // Change font size of input
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={handleTopUp}
                sx={{ borderRadius: 20, padding: '10px', fontSize: '1.1rem' }}
                className='text-white'
              >
                Top Up
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TopUpWallet;
