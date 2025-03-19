import React, { useState } from 'react';
import { Modal, Box, IconButton, Icon, TextField, Button, Typography, Backdrop } from '@mui/material';
import axios from 'axios'; // Import axios
import "./AddStaff.css";
import { BASE_URL
 } from 'Api';
export default function AddStaff(props) {
  // Form state
  const [name, setName] = useState('');
  const [national_id, setnational_id] = useState('');
  const [department, setDepartment] = useState('');
  const [start_date, setstart_date] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setphone] = useState('');
  const [email, setEmail] = useState('');
  const [number_plate, setnumber_plate] = useState('');

  const handleAddClose = () => {
    props.setShowAddStaff(false); // Close the modal
  };

  const handleAddMessageClick = () => {
    // Create staff object
    const staffData = {
      name,
      national_id,
      department,
      start_date,
      address,
      phone,
      email,
      number_plate,
    };

    // Post data using axios
    axios.post(`${BASE_URL}/add_staff`, staffData)
      .then(response => {
        props.setReflesh(prevReflesh => !prevReflesh);
        // Reset form fields
        setName('');
        setnational_id('');
        setDepartment('');
        setstart_date('');
        setAddress('');
        setphone('');
        setEmail('');
        setnumber_plate('');
        props.setShowAddStaff(false); // Close the modal
        props.setShowAddMessage(true); // Show success message
      })
      .catch(error => {
        console.error('Error adding staff:', error);
        props.setShowAddMessage(true); // Show error message
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
      aria-labelledby="add-staff-modal"
      aria-describedby="add-staff-description"
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
          <Typography id="add-staff-modal" variant="h6" component="h2">
            Add Staff
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
            label="national_id"
            variant="outlined"
            fullWidth
            margin="normal"
            value={national_id}
            onChange={(e) => setnational_id(e.target.value)}
          />
          <TextField
            label="Department"
            variant="outlined"
            fullWidth
            margin="normal"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <TextField
            label="Start Date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={start_date}
            onChange={(e) => setstart_date(e.target.value)}
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
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Vehicle Number Plate"
            variant="outlined"
            fullWidth
            margin="normal"
            value={number_plate}
            onChange={(e) => setnumber_plate(e.target.value)}
          />
        </div>

        <Button 
        className='text-light'
          variant="contained" 
          color="primary" 
          onClick={handleAddMessageClick}
          style={{ backgroundColor: '#92ba77', marginTop: 16 }}
          fullWidth
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
}
