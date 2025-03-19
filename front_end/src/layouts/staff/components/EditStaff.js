import React, { useEffect, useState } from 'react';
import './AddStaff.css';
import { Modal, Box, IconButton, Icon, Typography, TextField, Button, Backdrop } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import { BASE_URL } from 'Api';

function EditStaff(props) {
  const [staff, setStaff] = useState({
    name: '',
    address: '',
    national_id: '',
    number_plate: '',
    department: '',
    phone: '',
    email: '',
    start_date: '',
  });


  const [open, setOpen] = useState(true); // Modal open state

  useEffect(() => {
    // Fetch staff data when the component mounts
    axios.get(`${BASE_URL}/get_staff/${props.id}`)
      .then(response => {
        setStaff(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the staff data!', error);
      });
  }, [props.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddClose = () => {
    setOpen(false); // Close the modal
    props.setShowEditStaff(false); // Prop to hide the edit form
  };


  const handleSaveChanges = () => {
      // Create the staff object in the exact order you want

      // Create an ordered object based on the required key order
      const orderedStaff = {
        id: staff.id,
        name: staff.name,
        address: staff.address,
        national_id: staff.national_id,
        number_plate: staff.number_plate,
        department: staff.department,
        phone: staff.phone,
        email: staff.email,
        start_date: staff.start_date
      };
  
      // Convert the staff object to application/x-www-form-urlencoded format
      const formData = qs.stringify(orderedStaff);
      
      // Send the form data with Axios
      axios.post(`${BASE_URL}/edit_staff`, formData, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
      })
      .then(response => {
          console.log('Staff updated successfully:', response);
          props.setShowEditStaff(false); // Close the modal
          props.setReflesh(prevReflesh => !prevReflesh); // Refresh the page to reflect the changes
          alert('Successfully edited staff data');
      })
      .catch(error => {
          if (error.response) {
              console.error('Error response:', error.response);
              if (error.response.status === 422) {
                  const validationErrors = error.response.data.errors;
                  if (validationErrors) {
                      // Log each validation error for debugging
                      Object.keys(validationErrors).forEach((field) => {
                          console.log(`Error with field "${field}": ${validationErrors[field].join(', ')}`);
                      });
                  }
                  alert('There was a validation error. Please check your inputs.');
              } else {
                  alert(`Server error occurred. Status: ${error.response.status}`);
              }
          } else {
              
              alert('There was an error processing the request.');
          }
      });
  };
  
  return (
    <Modal
      open={open}
      onClose={handleAddClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: { backgroundColor: 'transparent' }
      }}
      aria-labelledby="edit-staff-modal"
      aria-describedby="edit-staff-description"
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
          <Typography id="edit-staff-modal" variant="h6" component="h2">
            Edit Staff
          </Typography>
          <IconButton onClick={handleAddClose}>
            <Icon style={{ color: '#92ba77' }}>close</Icon>
          </IconButton>
        </div>

        <div style={{ marginTop: 16 }}>
          {/* Name Field */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={staff.name}
            onChange={handleChange}
          />
          {/* National ID Field */}
          <TextField
            label="National ID"
            variant="outlined"
            fullWidth
            margin="normal"
            name="national_id"
            value={staff.national_id}
            onChange={handleChange}
          />
          {/* Department Field */}
          <TextField
            label="Department"
            variant="outlined"
            fullWidth
            margin="normal"
            name="department"
            value={staff.department}
            onChange={handleChange}
          />
          {/* Start Date Field */}
          <TextField
            label="Start Date"
            variant="outlined"
            fullWidth
            margin="normal"
            name="start_date"
            value={staff.start_date}
            onChange={handleChange}
          />
          {/* Address Field */}
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="address"
            value={staff.address}
            onChange={handleChange}
          />
          {/* Phone Number Field */}
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={staff.phone}
            onChange={handleChange}
          />
          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={staff.email}
            onChange={handleChange}
          />
          {/* Vehicle Number Plate Field */}
          <TextField
            label="Vehicle Number Plate"
            variant="outlined"
            fullWidth
            margin="normal"
            name="number_plate"
            value={staff.number_plate}
            onChange={handleChange}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          style={{ backgroundColor: '#92ba77', marginTop: 16 }}
          fullWidth
          className='text-light'
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
}

export default EditStaff;
