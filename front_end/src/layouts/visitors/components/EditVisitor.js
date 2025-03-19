import React, { useEffect, useState } from 'react';
import { Modal, Box, IconButton, Icon, Typography, TextField, Button, Backdrop } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import { BASE_URL } from 'Api';

function EditVisitor(props) {
  const [visitor, setVisitor] = useState({
    visitor_name: '',
    address: '',
    national_id: '',
    number_plate: '',
  });

  useEffect(() => {
    // Fetch visitor data when the component mounts
    axios.get(`${BASE_URL}/get_visitor/${props.id}`)
      .then(response => {
        setVisitor(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the visitor data!', error);
      });
  }, [props.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitor(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveChanges = () => {

    const orderedVisitor = {
      visitor_name: visitor.visitor_name,
      address: visitor.address,
      national_id: visitor.national_id,
      number_plate: visitor.number_plate,
      id: visitor.id
    };
    
  
    // Convert visitor object to application/x-www-form-urlencoded format
    const formData = qs.stringify(orderedVisitor);

  
    axios.post(`${BASE_URL}/edit_visitor`, formData, {
     
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    })
    .then(response => {
      console.log('response response', response)
      if (response.status === 200) {
        // Check if the response is successful (You may adjust based on your API's success condition)
        // Call setShowEditVisitor here
        props.setShowEditVisitor(false);
        props.setRefresh(prevReflesh => !prevReflesh);
        alert('Successfully edited visitor data');
      } else {
        // If response does not indicate success (based on API design)
        
        alert('Failed to update visitor data');
      }
    })
    .catch(error => {
      // This block will catch network or other errors
      console.error('There was an error updating the visitor data!', error);
      
      // Provide error feedback for debugging
      alert('There was an error updating the visitor data. Please try again.');
    });
  };
  
  const handleEditClose = () => {
    // Close the modal when the close button is clicked
    props.setShowEditVisitor(false);
  };
  

  return (
    <Modal
      open={true}  // Assuming the modal is open when this component renders
      onClose={handleEditClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: { backgroundColor: 'transparent' }
      }}
      aria-labelledby="edit-visitor-modal"
      aria-describedby="edit-visitor-description"
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
          <Typography id="edit-visitor-modal" variant="h6" component="h2">
            Edit Visitor
          </Typography>
          <IconButton onClick={handleEditClose}>
            <Icon style={{ color: '#92ba77' }}>close</Icon>
          </IconButton>
        </div>

        <div style={{ marginTop: 16 }}>
          {/* Visitor Name Field */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="visitor_name"
            value={visitor.visitor_name}
            onChange={handleChange}
          />
          {/* National ID Field */}
          <TextField
            label="ID Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="national_id"
            value={visitor.national_id}
            onChange={handleChange}
          />
          {/* Number Plate Field */}
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="number_plate"
            value={visitor.number_plate}
            onChange={handleChange}
          />
          {/* Address Field */}
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            name="address"
            value={visitor.address}
            onChange={handleChange}
          />
        </div>

        <Button
        className='text-light'
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          style={{ backgroundColor: '#92ba77', marginTop: 16 }}
          fullWidth
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
}

export default EditVisitor;
