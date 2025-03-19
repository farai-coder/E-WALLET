import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "Api";
import {
  Grid,
  Card,
  IconButton,
  Modal,
  Box,
  Typography,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


function Reports() {
  const [alerts, setAlerts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);

  useEffect(() => {
    // Fetch data from the API using axios
    axios.get(`${BASE_URL}/report/`)
      .then(response => setAlerts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/report/?id=${id}`)
      .then(response => {
        if (response.status === 200) {
          // Update state to remove the deleted alert
          setAlerts(alerts.filter(alert => alert.id !== id));
        } 
      });
  };

  const handleDeleteAll = () => {
    // Loop through all alerts and delete them one by one
    alerts.forEach((alert) => {
      axios.delete(`${BASE_URL}/report/?id=${alert.id}`)
        .then(response => {
          if (response.status === 200) {
            // Remove deleted alert from the state
            setAlerts((prevAlerts) => prevAlerts.filter(item => item.id !== alert.id));
          }
        })
        .catch(error => {
          console.error('Error deleting alert:', error);
        });
    });
    
    setSnackbarMessage("All alerts deleted successfully.");
    setSnackbarOpen(true);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleViewDetails = (anomaly) => {
    setSelectedAnomaly(anomaly);
    handleOpenModal();
  };

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
                <MDTypography variant="h5">Alerts</MDTypography>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={handleDeleteAll} 
                  style={{ marginTop: '16px' }}
                >
                  Delete All Alerts
                </Button>
              </MDBox>
              
              <MDBox pt={2} px={2}>
                {alerts.map(renderAlert)}
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

export default Reports;
