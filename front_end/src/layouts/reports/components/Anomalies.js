import React, { useState, useEffect } from 'react';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Modal, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from 'Api';
import { BASE_URL } from 'Api';
import AnomalyDetail from './AnomalyDetail';

function Anomalies() {
  const [selectedAnomaly, setSelectedAnomaly] = useState(null); // To store the selected anomaly
  const [open, setOpen] = useState(false); // Modal state
  const [anomalies, setAnomalies] = useState([]); // State to store anomalies data
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(null); // State to store any error
  const [closeAnomalyDetail,setCloseAnomalyDetail] = useState(false) 
  const [showAnomalyDetail, setShowAnomalyDetail] = useState(false);

  const handleViewDetails = (anomaly) => {
    setSelectedAnomaly(anomaly); // Store the clicked row's data
    setOpen(true); // Open the modal
    setShowAnomalyDetail(true);
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Additional logic for when the modal closes can go here
  };


  const handleCloseAnomalyDetail = () => {
    setShowAnomalyDetail(false);
    setSelectedAnomaly(null);
  };


  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/show_anomalies`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnomalies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts


  const handleClose = () => {
    setOpen(false); // Close the modal
    setSelectedAnomaly(null); // Clear the selected anomaly
  };

  return (
    <div>
      {showAnomalyDetail && <AnomalyDetail onClose={handleCloseAnomalyDetail} log={selectedAnomaly} />}
      <Typography variant="h6" mb={2}>Anomalies</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Time</strong></TableCell>
              <TableCell><strong>Anomaly Type</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
            {anomalies.map((anomaly) => (
              <TableRow key={anomaly.log_id}>
                <TableCell>{anomaly.log_id}</TableCell>
                <TableCell>{anomaly.date_in}</TableCell>
                <TableCell>{anomaly.time_in}</TableCell>
                <TableCell>No Plate Found</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewDetails(anomaly)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Anomalies;
