import React, { useState } from 'react';
import { Modal, Box, IconButton, Icon, TextField, Button, Typography, Backdrop } from '@mui/material';
import axios from 'axios'; // Import axios
import { BASE_URL } from 'Api';

export default function AddVisitor(props) {
  // Form state
  const [name, setName] = useState('');
  const [national_id, setNationalId] = useState('');
  const [address, setAddress] = useState('');
  const [number_plate, setNumberPlate] = useState('');

  const handleAddClose = () => {
    props.setShowAddVisitor(false); // Close the modal
  };

  const handleAddVisitor = () => {
    // Create visitor object
    const visitorData = {
      name,
      national_id,
      address,
      number_plate,
    };
    console.log('staff staff',visitorData )

// Post data using axios
axios.post(`${BASE_URL}/add_visitor`, visitorData)
.then(response => {
  console.log('Visitor added successfully:', response.data);
  // Reset form fields
  setName('');
  setNationalId('');
  setAddress('');
  setNumberPlate('');
  props.setShowAddVisitor(false); // Close the modal
  props.setRefresh(prevReflesh => !prevReflesh);
  alert('Visitor added successfully!'); // Show success message
})
.catch(error => {
  console.error('Error adding visitor:', error);
  props.setShowAddVisitor(false); // Close the modal on error
  alert('Failed to add visitor.'); // Show error message
});
};


  return (
    <Modal
      open={true}  // Assuming the modal is open when this component renders
      onClose={handleAddClose} 
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: { backgroundColor: 'transparent' }
      }}
      aria-labelledby="add-visitor-modal"
      aria-describedby="add-visitor-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        transform: 'translate(50%, -3%)',
        width: 450,
        maxHeight: '80vh', // Set maximum height
        bgcolor: 'background.paper',
        border: '1px solid #ddd',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflowY: 'auto', // Enable vertical scrolling
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="add-visitor-modal" variant="h6" component="h2">
            Add Visitor
          </Typography>
          <IconButton onClick={handleAddClose}>
            <Icon style={{ color: '#92ba77' }}>close</Icon>
          </IconButton>
        </div>

        <div style={{ marginTop: 16 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="National ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={national_id}
            onChange={(e) => setNationalId(e.target.value)}
          />
          
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        
          <TextField
            label="Vehicle Number Plate"
            variant="outlined"
            fullWidth
            margin="normal"
            value={number_plate}
            onChange={(e) => setNumberPlate(e.target.value)}
          />
        </div>

        <Button 
        className='text-light'
          variant="contained" 
          color="primary" 
          onClick={handleAddVisitor}
          style={{ backgroundColor: '#92ba77', marginTop: 16 }}
          fullWidth
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
}
