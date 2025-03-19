// src/components/VisitsModal.js
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Backdrop,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Correct import for Close icon

// Sample visits data
const visitsData = [
  { numberPlate: 'ABC123', numberOfVisits: 5, lastVisit: '2024-09-10' },
  { numberPlate: 'XYZ789', numberOfVisits: 3, lastVisit: '2024-09-09' },
  // Add more visit records as needed
];

const VisitsModal = ({ open, onClose }) => {
  const handleBackdropClick = () => {
    onClose();
    return null;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      onBackdropClick={handleBackdropClick}
      BackdropProps={{ style: { backgroundColor: 'transparent' } }} // Adjust backdrop color
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24, // Adjust shadow if needed
          p: 4,
          borderRadius: 2, // Optional: add rounded corners
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" id="modal-title">
            Visit Records
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
            
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell><strong>Number Plate</strong></TableCell>
                <TableCell><strong>Number of Visits</strong></TableCell>
                <TableCell><strong>Last Visit</strong></TableCell>
              </TableRow>
              {visitsData.map((visit, index) => (
                <TableRow key={index}>
                  <TableCell>{visit.numberPlate}</TableCell>
                  <TableCell>{visit.numberOfVisits}</TableCell>
                  <TableCell>{visit.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default VisitsModal;
