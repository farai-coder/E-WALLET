import React from 'react';
import { Grid, IconButton, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MDAlert from 'components/MDAlert'; // Assuming MDAlert is a custom component
import MDTypography from 'components/MDTypography'; // Assuming MDTypography is a custom component
import MDBox from 'components/MDBox'; // Assuming MDBox is a custom component
import MDSnackbar from 'components/MDSnackbar'; // Assuming MDSnackbar is a custom component

const dummyProblems = [
  { id: 1, category: 'error', description: 'Camera not responding. No video feed available.' },
  { id: 2, category: 'warning', description: 'MQTT broker is offline. Connection lost.' },
  { id: 3, category: 'error', description: 'Client disconnected unexpectedly.' },
  { id: 4, category: 'error', description: 'Microcontroller not responding to commands.' },
  { id: 5, category: 'warning', description: 'No video feed. Camera feed interrupted.' }
];

function handleDelete(id) {
  console.log('Delete problem with ID:', id);
  // Handle the deletion of the alert here
}

function Problems() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const renderAlert = (alert) => {
    return (
      <MDAlert key={alert.id} color={alert.category} dismissible>
        <MDTypography variant="body2" color="white">
          {alert.description}
        </MDTypography>
        <IconButton 
          onClick={() => handleDelete(alert.id)} 
          color="inherit" 
          style={{ 
            position: 'absolute', 
            right: 8, 
            top: 8, 
            opacity: 0.0 // Make the delete icon transparent
          }}
        >
          <DeleteIcon />
        </IconButton>
      </MDAlert>
    );
  };

  return (
    <div>
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card style={{ position: 'relative' }}>
              <MDBox p={2}>
                <MDTypography variant="h5">System Problems</MDTypography>
              </MDBox>
              
              <MDBox pt={2} px={2}>
                {dummyProblems.map(renderAlert)}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDSnackbar 
        color="success" 
        content={snackbarMessage} 
        open={snackbarOpen} 
        onClose={() => setSnackbarOpen(false)} 
        close={() => setSnackbarOpen(false)}
      />
    </div>
  );
}

export default Problems;
