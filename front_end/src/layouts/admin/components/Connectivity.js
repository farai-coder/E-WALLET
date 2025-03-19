import React, { useState, useEffect } from 'react';
import { Button, Table, Backdrop, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Modal, Box, Typography, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import qs from 'qs';
import { BASE_URL } from 'Api';

function Connectivity() {
  const [checked, setChecked] = useState(false);
 
  const [devices, setDevices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [newDevice, setNewDevice] = useState({ device_name: '', ip_address: '', subnet_mask: '', status: "enabled" });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openEditServer, setOpenEditServer] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [selectedServer,setSeletedServer] =   useState('')
  const [server, setServer] = useState({
    name: "MyServer",
    ip: "192.168.1.1",
    mask: "255.255.255.0",
    port: 8080
});
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [servers, setServers] = useState([])
  console.log("seleted server", selectedServer)

  useEffect(() => {
    // Fetch data from the API
    axios.get(`${BASE_URL}/devices/get`)
      .then(response => {
        setDevices(response.data); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
  }, [deviceToDelete, add, edit]); // Empty dependency array means this effect runs once when component mounts

  useEffect(() => {
    // Fetch data from the API
    axios.get(`${BASE_URL}/servers/`)
      .then(response => {
        setServers(response.data); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching servers:', error);
      });
  }, [deviceToDelete, add, edit]); // Empty dependency array means this effect runs once when component mounts

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleDeviceToggle = (id) => {
    setDevices(devices.map((device) => {
      if (device.id === id) {
        return { ...device, connected: !device.connected };
      }
      return device;
    }));
  };
  const handleEditServer = (server) => {
    setOpenEditServer(true);
    setSeletedServer(server)
  };

  const handleEditClick = (device) => {
    setSelectedDevice(device);
    setOpenEditDialog(true);
  };

  const handleEditServerSave = async  () => {
    setOpenEditServer(false)
    const reversedServer =  {
      server_name: selectedServer.server_name,
      ip_address: selectedServer.ip_address,
      subnet_mask: selectedServer.subnet_mask,
      port:selectedServer.port
    };

    const formData = qs.stringify(reversedServer);
    try {
      // Make the API call to update the user
      
      const response = await axios.put(`${BASE_URL}/server/edit/?${formData}`)
      

      if (response.data.msg === "server updated") {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error updating user:', error);
    }
    alert('Sucessfully edit server data');

  }

  const handleEditSave = async () => {
    try {

      const reversedDevice = {
        device_name: selectedDevice.device_name,
        ip_address: selectedDevice.ip_address,
        subnet_mask: selectedDevice.subnet_mask,
        status: selectedDevice.status
      };

      // Convert the device object to application/x-www-form-urlencoded format
      const formData = qs.stringify(reversedDevice);


      // Send the data to the API
      await axios.post(`${BASE_URL}/devices/edit`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Set the content type to application/x-www-form-urlencoded
        }
      });
      // Show a success alert message
      alert('Device updated successfully');
      setEdit(prevEdit => !prevEdit);

      // Close the edit dialog and clear the selected device
      setOpenEditDialog(false);
      setSelectedDevice(null);
    } catch (error) {
      console.error('Error updating device:', error);

      // Show an error alert message
      alert('Error updating device. Please try again.');
    }
  };

  const handleDeleteClick = (device) => {

    setDeviceToDelete(device);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deviceToDelete) return; // Ensure there's a device to delete

    try {
      const response = await fetch(`${BASE_URL}/devices/?device_name=${deviceToDelete.device_name}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the device');
      }

      // Close the dialog
      setOpenDeleteDialog(false);
      setDeviceToDelete(null);
    } catch (error) {
      console.error('Error deleting device:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddSave = async () => {
    try {
      // Send the data to the API
      await axios.post(`${BASE_URL}/devices/`, newDevice, {

      });

      // Close the add dialog and reset the new device form
      setOpenAddDialog(false)

      // Show a success alert message
      alert('Device added successfully');
      setAdd(prevAdd => !prevAdd);
    } catch (error) {
      console.error('Error adding device:', error);

      // Show an error alert message
      alert('Error adding device. Please try again.');
    }
  };
 
  return (
    <div>
      <Button variant="contained" color="primary" className='p-2 m-2 text-white' onClick={() => setEditMode(!editMode)}>
        {editMode ? 'Cancel' : 'Edit'}
      </Button>

      {editMode && (
        <>
          <Button variant="contained" color="primary" className="p-2 ms-1 text-white" onClick={handleAddClick} startIcon={<AddIcon />}>
            Add Device
          </Button>
          <Table striped bordered hover className="table mb-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">IP Address</th>
                <th scope="col">Subnet Mask</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.device_name}>
                  <td>{device.device_name}</td>
                  <td>{device.ip_address}</td>
                  <td>{device.subnet_mask}</td>
                  <td>
                    <div className="d-inline-flex align-items-center">
                      <span
                        onClick={() => handleEditClick(device)}
                        style={{ cursor: 'pointer', color: '#2cd478', marginRight: '10px' }}
                      >
                        <EditIcon />
                      </span>
                      <span
                        onClick={() => handleDeleteClick(device)}
                        style={{ cursor: 'pointer', color: 'red' }}
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">IP Address</th>
                <th scope="col">Subnet Mask</th>
                <th scope="col">Port</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server)  => (
              <tr key={server.id}>
                <td>{server.server_name}</td>
                <td>{server.ip_address}</td>
                <td>{server.subnet_mask}</td>
                <td>{server.port}</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <span
                      onClick={() => handleEditServer(server)}
                      style={{ cursor: 'pointer', color: '#2cd478', marginRight: '10px' }}
                    >
                      <EditIcon />
                    </span>

                  </div>
                </td>
              </tr>
              ))}

            </tbody>
          </Table>
        </>
      )}

      {!editMode && (
        <div className="list-group mb-5 shadow">
          {devices.map((device) => (
            <div className="list-group-item" key={device.device_name}>
              <div className="row align-items-center">
                <div className="col">
                  <strong className="mb-2">{device.device_name}</strong>
                  <p className="text-muted mb-0">IP Address: {device.ip_address}</p>
                  <p className="text-muted mb-0">Subnet Mask: {device.subnet_mask}</p>
                </div>
                <div className="col-auto">
                  <Switch
                    onChange={() => handleDeviceToggle(device.id)}
                    checked={device.connected}
                    onHandleColor={'#fff'}
                    onColor={'#1A35FF'}
                  />
                </div>
              </div>
            </div>
          ))}
           {servers.map((server) => (
          <div className="list-group-item" key={server.id}>
            <div className="row align-items-center">
              <div className="col" >
                <strong className="mb-2">{server.server_name}</strong>
                <p className="text-muted mb-0">{server.ip_address}</p>
                <p className="text-muted mb-0">{server.subnet_mask}</p>
                <p className="text-muted mb-0">{server.port}</p>
              </div>
              
              <div className="col-auto">
                <Switch
                  onChange={() => handleDeviceToggle(1)}
                  checked={`connected`}
                  onHandleColor={'#fff'}
                  onColor={'#1A35FF'}
                />
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Add Device Modal */}
      <Modal
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
      >
        <Box
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            maxWidth: 400,
            boxShadow: 24,
            mx: 'auto',
            position: 'absolute', // Make the Box position relative for absolute positioning of the close button
          }}
        >
          <IconButton
            onClick={() => setOpenAddDialog(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'text.primary',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Add New Device</Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newDevice.device_name}
            onChange={(e) => setNewDevice({ ...newDevice, device_name: e.target.value })}
          />
          <TextField
            label="IP Address"
            fullWidth
            margin="normal"
            value={newDevice.ip_address}
            onChange={(e) => setNewDevice({ ...newDevice, ip_address: e.target.value })}
          />
          <TextField
            label="Subnet Mask"
            fullWidth
            margin="normal"
            value={newDevice.subnet_mask}
            onChange={(e) => setNewDevice({ ...newDevice, subnet_mask: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSave}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* Edit Device Modal */}
      <Modal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
      >
        <Box sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          maxWidth: 400,
          mx: 'auto',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          mx: 'auto',
          position: 'absolute',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" className='text-white'>Edit Device</Typography>
            <IconButton onClick={() => setOpenEditDialog(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          {selectedDevice && (
            <>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={selectedDevice.device_name}
                onChange={(e) => setSelectedDevice({ ...selectedDevice, name: e.target.value })}
              />
              <TextField
                label="IP Address"
                fullWidth
                margin="normal"
                value={selectedDevice.ip_address}
                onChange={(e) => setSelectedDevice({ ...selectedDevice, ip_address: e.target.value })}
              />
              <TextField
                label="Subnet Mask"
                fullWidth
                margin="normal"
                value={selectedDevice.subnet_mask}
                onChange={(e) => setSelectedDevice({ ...selectedDevice, subnet_mask: e.target.value })}
              />
              <Button variant="contained" color="primary" className='text-white' onClick={handleEditSave}>Save</Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Edit Server Modal */}
      <Modal
        open={openEditServer}
        onClose={() => setOpenEditServer(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
      >
        <Box sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          maxWidth: 400,
          mx: 'auto',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          mx: 'auto',
          position: 'absolute',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" className='text-white'>Edit Server</Typography>
            <IconButton onClick={() => setOpenEditServer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          {selectedServer && (
            <>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={selectedServer.server_name}
                onChange={(e) => setSeletedServer({ ...selectedServer, server_name: e.target.value })}
              />
              <TextField
                label="IP Address"
                fullWidth
                margin="normal"
                value={selectedServer.ip_address}
                onChange={(e) => setSeletedServer({ ...selectedServer, ip_address: e.target.value })}
              />
              <TextField
                label="Subnet Mask"
                fullWidth
                margin="normal"
                value={selectedServer.subnet_mask}
                onChange={(e) => setSeletedServer({ ...selectedServer, subnet_mask: e.target.value })}
              />
              <TextField
                label="Port Number"
                fullWidth
                margin="normal"
                value={selectedServer.port}
                onChange={(e) => setSeletedServer({ ...selectedServer, port: e.target.value })}
              />
              <Button variant="contained" color="primary" onClick={handleEditServerSave} className='text-white'>Save</Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Delete Device Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        BackdropComponent={Backdrop}
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
        <DialogTitle>Delete Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {deviceToDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Connectivity;
