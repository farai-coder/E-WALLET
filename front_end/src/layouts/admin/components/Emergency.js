import React, { useState } from 'react';
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { Backdrop } from '@mui/material';
import "./Admin.css";

function Emergency() {
  const [emergencySettings, setEmergencySettings] = useState({
    enableSound: false,
    autoOpen: false,
    popAlert: false,
  });

  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true); // Default to showing details
  const [editMode, setEditMode] = useState(false);
  const [editAccessTimeId, setEditAccessTimeId] = useState(null);

  const [accessTimeClasses, setAccessTimeClasses] = useState([
    {
      id: 1,
      from: '08:00',
      to: '12:00',
      vehicles: [1, 2],
    },
    {
      id: 2,
      from: '12:00',
      to: '16:00',
      vehicles: [2, 3],
    },
    {
      id: 3,
      from: '16:00',
      to: '20:00',
      vehicles: [1, 3],
    },
  ]);

  const [newAccessTime, setNewAccessTime] = useState({ from: '', to: '' });
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const vehiclesLog = [
    { id: 1, numberPlate: "ABC123", ownerName: "John Doe" },
    { id: 2, numberPlate: "XYZ789", ownerName: "Jane Smith" },
    { id: 3, numberPlate: "LMN456", ownerName: "Alice Johnson" },
    // Add more vehicles to test scrolling
    { id: 4, numberPlate: "DEF456", ownerName: "Mike Brown" },
    { id: 5, numberPlate: "GHI789", ownerName: "Lisa White" },
    { id: 6, numberPlate: "JKL012", ownerName: "Emma Davis" },
    { id: 7, numberPlate: "MNO345", ownerName: "Oliver Wilson" },
    { id: 8, numberPlate: "PQR678", ownerName: "Sophia Lee" },
  ];

  const handleChange = (event) => {
    setEmergencySettings({
      ...emergencySettings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditMode(false); // Reset to adding mode
    setEditAccessTimeId(null);
    setNewAccessTime({ from: '', to: '' });
    setSelectedVehicles([]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const handleNewAccessTimeChange = (event) => {
    setNewAccessTime({
      ...newAccessTime,
      [event.target.name]: event.target.value,
    });
  };

  const handleVehicleChange = (event) => {
    const vehicleId = Number(event.target.value);
    setSelectedVehicles((prevSelected) =>
      prevSelected.includes(vehicleId)
        ? prevSelected.filter((id) => id !== vehicleId)
        : [...prevSelected, vehicleId]
    );
  };

  const handleSave = () => {
    if (editMode) {
      // Update existing access time class
      setAccessTimeClasses((prevClasses) =>
        prevClasses.map((accessClass) =>
          accessClass.id === editAccessTimeId
            ? { ...accessClass, from: newAccessTime.from, to: newAccessTime.to, vehicles: selectedVehicles }
            : accessClass
        )
      );
    } else {
      // Add new access time class
      if (newAccessTime.from && newAccessTime.to && selectedVehicles.length > 0) {
        const newClass = {
          id: accessTimeClasses.length + 1,
          from: newAccessTime.from,
          to: newAccessTime.to,
          vehicles: selectedVehicles,
        };
        setAccessTimeClasses([...accessTimeClasses, newClass]);
      }
    }
    // Reset form and close dialog
    setNewAccessTime({ from: '', to: '' });
    setSelectedVehicles([]);
    setOpen(false);
  };

  const handleEdit = (id) => {
    const accessClass = accessTimeClasses.find((cls) => cls.id === id);
    if (accessClass) {
      setEditAccessTimeId(id);
      setNewAccessTime({ from: accessClass.from, to: accessClass.to });
      setSelectedVehicles(accessClass.vehicles);
      setEditMode(true);
      setOpen(true);
    }
  };

  const handleDelete = (id) => {
    setAccessTimeClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== id));
  };

  return (
    <div>
      <div className="list-group mb-5 shadow">
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Enable Sound</strong>
              <p className="text-muted mb-0">Enable sound alerts for emergency situations.</p>
            </div>
            <div className="col-auto">
              <Switch
                name="enableSound"
                checked={emergencySettings.enableSound}
                onChange={handleChange}
                onHandleColor={'#fff'}
                onColor={'#1A35FF'}
              />
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Auto Open for Frequent Visitors</strong>
              <p className="text-muted mb-0">Auto-open the gate for frequent visitors.</p>
            </div>
            <div className="col-auto">
              <Switch
                name="autoOpen"
                checked={emergencySettings.autoOpen}
                onChange={handleChange}
                onHandleColor={'#fff'}
                onColor={'#1A35FF'}
              />
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              <strong className="mb-2">Pop Alert for Unknown Vehicles</strong>
              <p className="text-muted mb-0">Pop an alert for unknown vehicles.</p>
            </div>
            <div className="col-auto">
              <Switch
                name="popAlert"
                checked={emergencySettings.popAlert}
                onChange={handleChange}
                onHandleColor={'#fff'}
                onColor={'#1A35FF'}
              />
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row align-items-center">
            <div className="col">
              
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
        PaperProps={{
          sx: {
            boxShadow: 24,
            borderRadius: 2,
          }
        }}>
        <DialogTitle>
          {editMode ? `Edit Access Time Class ${editAccessTimeId}` : 'Add Access Time'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Access Time From"
                type="time"
                name="from"
                value={newAccessTime.from}
                onChange={handleNewAccessTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Access Time To"
                type="time"
                name="to"
                value={newAccessTime.to}
                onChange={handleNewAccessTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: '16px' }}>
            <strong>Select Vehicles</strong>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '8px' }}>
              {vehiclesLog.map((vehicle) => (
                <FormControlLabel
                  key={vehicle.id}
                  control={
                    <Checkbox
                      value={vehicle.id}
                      checked={selectedVehicles.includes(vehicle.id)}
                      onChange={handleVehicleChange}
                    />
                  }
                  label={`${vehicle.numberPlate} - ${vehicle.ownerName}`}
                />
              ))}
            </div>
          </div>
          {showDetails && (
            <div style={{ marginTop: '16px' }}>
              <h3>Access Time Classes</h3>
              {accessTimeClasses.length > 0 ? (
                accessTimeClasses.map((accessClass) => (
                  <div key={accessClass.id} style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <h4 style={{ margin: 0 }}>Access Time Class {accessClass.id}</h4>
                    <p><strong>From:</strong> {accessClass.from}</p>
                    <p><strong>To:</strong> {accessClass.to}</p>
                    <p><strong>Vehicles Allowed:</strong></p>
                    <ul>
                      {vehiclesLog.filter(vehicle => accessClass.vehicles.includes(vehicle.id)).map(vehicle => (
                        <li key={vehicle.id}>{vehicle.numberPlate} - {vehicle.ownerName}</li>
                      ))}
                    </ul>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: '8px' }}
                      onClick={() => handleEdit(accessClass.id)}
                      className='text-dark'
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(accessClass.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p>No access time classes available.</p>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleDetails} color="primary">
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editMode ? 'Save Changes' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Emergency;
