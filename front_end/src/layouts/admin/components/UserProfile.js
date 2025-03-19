import React, { useState } from 'react';
import { Icon, Modal, Box, List, ListItem, ListItemText, Typography, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import { Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { BASE_URL } from 'Api';
import qs from 'qs';

import axios from 'axios'; // Ensure Axios is imported

const UserProfile = () => {

  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false)
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [update, setUpdate] = useState('false')
 
  useEffect(() => {
    // Fetch user data from the API
    axios.get(`${BASE_URL}/all_users/`)
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); 
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [newUser, update]);

  // Apply filter based on filter value
  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      user.username.toLowerCase().includes(filter.toLowerCase())
    ));
  }, [filter, users]);

  const handleView = (user) => {
    console.log("users", user)
    setSelectedUser(user);
    setOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUsername(user.username);
    setNewPassword(user.password)
    setEditOpen(true);
  };

  // const handleEditSave = () => {
  //   setUsers(users.map(user => user.id === selectedUser.id ? { ...user, username: newUsername, history: [...user.history, `Changed username on ${new Date().toISOString().split('T')[0]}`] } : user));
  //   setEditOpen(false);
  //   setSelectedUser(null);
  // };
   // Function to handle user edits
   const handleEditSave = async () => {
    if (!newUsername || !newPassword) {
      alert("Username and password are required.");
      return;
    }
    const error = validatePassword(newPassword, newUsername);
    if (error) {
      setPasswordError(error);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    const data = {
      id: selectedUser.id,
      username: newUsername,
      password: newPassword
    }
    const formData = qs.stringify(data)
    try {
      // Make the API call to update the user
      
      const response = await axios.put(`${BASE_URL}/user/?${formData}`)
      

      if (response.data.msg === "user updated") {
        // Close the edit modal and clear selected user
        setEditOpen(false);
        setSelectedUser(null);
      } else {
        // Handle unexpected response
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error updating user:', error);
    }
    alert('Sucessfully edit user data');
    setUpdate((update) => !(update))
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    try {
      // Make DELETE request to the backend API
      const response = await axios.delete(`${BASE_URL}/user/`, {
        params: { id: userToDelete.id }
      });
  
      // Check if the response is successful
      if (response.status === 200) {
        // Update the state to remove the deleted user
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setDeleteDialogOpen(false);
        setUserToDelete(null);
        alert('User deleted successfully!');
      } else {
        alert('Failed to delete the user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setNewUser({ username: '', password: '' });
  };

  const validateUsername = (username) => {
    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
      return 'Username already exists.';
    }
    if (!username) {
      return 'Username must not be empty.';
    }
    return '';
  };

  const validatePassword = (password, username) => {
    if (!password) {
      return 'Password must not be empty.';
    }
    if (password.length < 8) {
      return 'Password is too weak. It must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one capital letter.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    if (password.includes(username)) {
      return 'Password should not contain the username.';
    }
    return '';
  };

  const handleAddSave = async () => {
      const usernameValidationError = validateUsername(newUser.username);
      const passwordValidationError = validatePassword(newUser.password, newUser.username);
  
      if (usernameValidationError || passwordValidationError) {
        setUsernameError(usernameValidationError);
        setPasswordError(passwordValidationError);
      } else {
        try {
          // Make a POST request to the backend API
          const response = await axios.post(`${BASE_URL}/users/`, {
            username: newUser.username,
            password: newUser.password,
          });
  
          // Notify user of successful registration
          alert('User registered successfully!');
  
          // Reset the form and errors
          setNewUser({ username: '', password: '' });
          setUsernameError('');
          setPasswordError('');
          setAddOpen(false);
        } catch (error) {
          // Handle errors here
          console.error('Error registering user:', error);
          
          // Notify user of an error
          if (error.response && error.response.data && error.response.data.detail) {
            alert(`Registration failed: ${error.response.data.detail}`);
          } else {
            alert('An error occurred while registering the user.');
          }
        }
      }
  };
  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleClickShowEditPassword = () => {
    setShowEditPassword(!showEditPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div>
      <div className="admin-settings">
        <TextField
          label="Filter Users"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          autoComplete="off"
        />
        <Button className="text-white" variant="contained" color="primary" onClick={handleAddOpen} startIcon={<Icon>add</Icon>}>
          Add User
        </Button>
        <Table striped bordered hover className="table">
      <thead>
        <tr>
          <th style={{ fontSize: '15px' }} scope="col">ID</th>
          <th style={{ fontSize: '15px' }} scope="col">Username</th>
          <th style={{ fontSize: '15px' }} scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td style={{ fontSize: '15px' }}>{user.id}</td>
            <td style={{ fontSize: '15px' }}>{user.username}</td>
            <td>
              <div className="d-inline-flex align-items-center">
                <Icon onClick={() => handleView(user)} style={{ cursor: 'pointer', color: '#5cb1ed', marginRight: '10px' }}>visibility</Icon>
                <Icon onClick={() => handleEdit(user)} style={{ cursor: 'pointer', color: '#2cd478', marginRight: '10px' }}>edit</Icon>
                <Icon onClick={() => handleDelete(user)} style={{ cursor: 'pointer', color: 'red' }}>delete</Icon>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
      </div>
      <Modal
        open={open}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") handleClose();
        }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
        aria-labelledby="user-details-modal"
        aria-describedby="user-details-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          border: '1px solid #ddd',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              {selectedUser?.username}'s Details
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {selectedUser && (
            <>
              <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <AccountCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <strong>Username:</strong> {selectedUser.username}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ mr: 1, color: 'success.main' }} />
                <strong>Account Created At:</strong> {selectedUser.createdAt}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ mr: 1, color: 'warning.main' }} />
                <strong>History:</strong>
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* <List>
                {selectedUser.history.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List> */}
              <Divider sx={{ my: 2 }} />

            </>
          )}
        </Box>
      </Modal>
      <Modal
        open={editOpen}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") setEditOpen(false);
        }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
        aria-labelledby="edit-user-modal"
        aria-describedby="edit-user-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '1px solid #ddd',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              Edit {selectedUser?.username}
            </Typography>
            <IconButton onClick={() => setEditOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          {selectedUser && (
        <>
          <TextField
            label="New Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />

          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
         <TextField
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="text-white"
            variant="contained"
            color="primary"
            onClick={handleEditSave}
          >
            Save
          </Button>
        </>
      )}
        </Box>
      </Modal>
      <Modal
        open={addOpen}
        onClose={handleAddClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
        aria-labelledby="add-user-modal"
        aria-describedby="add-user-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '1px solid #ddd',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              Add New User
            </Typography>
            <IconButton onClick={handleAddClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            error={!!usernameError}
            helperText={usernameError}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            error={!!passwordError}
            helperText={passwordError}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button className="text-white" variant="contained" color="primary" onClick={handleAddSave}>
            Save
          </Button>
        </Box>
      </Modal>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
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
            Are you sure you want to delete {userToDelete?.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
