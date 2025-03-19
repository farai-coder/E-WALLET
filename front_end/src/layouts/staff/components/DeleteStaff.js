import React from 'react';
import axios from 'axios';
import { BASE_URL } from 'Api';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function DeleteStaff(props) {

  const handleDeleteClose = () => {
    props.setShowDeleteStaff(false);
    
  };
  const confirmDelete = async () => {
    try {
      await axios.post(`${BASE_URL}/delete_staff/${props.id}`);
      props.setReflesh(prevReflesh => !prevReflesh);

    } catch (error) {
      console.error('Error deleting staff:', error);


    } finally {
      props.setShowDeleteStaff(false);

    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleDeleteClose}
      aria-labelledby="delete-user-dialog"
      aria-describedby="delete-user-dialog-description"
      BackdropProps={{
        style: { backgroundColor: 'transparent' }
      }}
      PaperProps={{
        sx: {
          boxShadow: 24,
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle id="delete-user-dialog">Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-user-dialog-description">
          Are you sure you want to delete this staff member?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClose} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmDelete} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteStaff;
