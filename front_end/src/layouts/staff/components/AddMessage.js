/* eslint-disable */

import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Icon, Backdrop } from '@mui/material';
import "./AddStaff.css";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

function AddMessage(props) {
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);

  const handleAdd = () => {
    props.setShowAddMessage(true); 
    setShowAddMessage(!showAddMessage);
    setShowAddStaff(!showAddStaff);
  };

  return (
    <Modal
      open={true}  // Assuming the modal is open when this component renders
      onClose={handleAdd} 
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: { backgroundColor: 'transparent' }
      }}
      aria-labelledby="add-message-modal"
      aria-describedby="add-message-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        transform: 'translate(-25%, -25%)',
        width: 450,
        bgcolor: 'background.paper',
        border: '1px solid #ddd',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="add-message-modal" variant="h6" component="h2">
            Add Staff
          </Typography>
          <IconButton onClick={handleAdd}>
            <Icon style={{ color: '#92ba77' }}>close</Icon>
          </IconButton>
        </div>
        <hr style={{ width: '100%', height: '0px', border: '1px solid #92ba77' }} />
        <p id="success-message" style={{ color: '#92ba77', marginBottom: 0 }}>
          <Icon fontSize="small" style={{ color: '#92ba77', marginRight: 10 }}>check_circle</Icon>
          Successfully saved staff data
        </p>
        <hr style={{ width: '100%', height: '0px', border: '1px solid #92ba77' }} />
      </Box>
    </Modal>
  );
}

export default AddMessage;
