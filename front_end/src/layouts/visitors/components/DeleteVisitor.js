import React from 'react';
import axios from 'axios';
import { BASE_URL } from 'Api';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function DeleteVisitor(props) {

  const handleDeleteClose = () => {
    props.setShowDeleteVisitor(false);
  };

  const confirmDelete = async () => {
    try {
      await axios.post(`${BASE_URL}/delete_visitor/?id=${props.id}`);
      console.log('Visitor deleted successfully');
      props.setRefresh(prevReflesh => !prevReflesh);
    } catch (error) {
      console.error('Error deleting visitor:', error);
    } finally {
      props.setShowDeleteVisitor(false);

    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleDeleteClose}
      aria-labelledby="delete-visitor-dialog"
      aria-describedby="delete-visitor-dialog-description"
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
      <DialogTitle id="delete-visitor-dialog">Delete Visitor</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-visitor-dialog-description">
          Are you sure you want to delete this visitor?
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

export default DeleteVisitor;
