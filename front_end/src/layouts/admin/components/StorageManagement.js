import React, { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';
import StorageUsage from './StorageUsage';
import { Box, Typography, Button, IconButton, Divider, TextField, MenuItem, Grid } from '@mui/material';

function StorageManagement() {
  // Sample data for user logs, vehicle logs, and pictures
  const [userLogs, setUserLogs] = useState([
    { id: 1, userName: 'user1', logDate: '2024-07-28', logTime: '10:00 AM' },
    { id: 2, userName: 'user2', logDate: '2024-07-27', logTime: '11:00 AM' },
    { id: 3, userName: 'user3', logDate: '2024-07-26', logTime: '12:00 PM' },
  ]);

  const [vehicleLogs, setVehicleLogs] = useState([
    { id: 1, vehicleId: 'vehicle1', logDate: '2024-07-28', logTime: '10:00 AM' },
    { id: 2, vehicleId: 'vehicle2', logDate: '2024-07-27', logTime: '11:00 AM' },
    { id: 3, vehicleId: 'vehicle3', logDate: '2024-07-26', logTime: '12:00 PM' },
  ]);

  const [pictures, setPictures] = useState([
    { id: 1, picture: 'pic1.jpg', uploadedDate: '2024-07-28' },
    { id: 2, picture: 'pic2.png', uploadedDate: '2024-07-27' },
    { id: 3, picture: 'pic3.jpg', uploadedDate: '2024-07-26' },
  ]);

  const [timeFrame, setTimeFrame] = useState('');
  const [deleteInterval, setDeleteInterval] = useState('');
  const [userLogSelectionModel, setUserLogSelectionModel] = useState([]);
  const [vehicleLogSelectionModel, setVehicleLogSelectionModel] = useState([]);
  const [pictureSelectionModel, setPictureSelectionModel] = useState([]);
  const [isAllSelectedUserLogs, setIsAllSelectedUserLogs] = useState(false);
  const [isAllSelectedVehicleLogs, setIsAllSelectedVehicleLogs] = useState(false);
  const [isAllSelectedPictures, setIsAllSelectedPictures] = useState(false);

  const handleUpload = () => {
    // Implement file upload functionality
  };

  const handleDelete = (id) => {
    // Implement file delete functionality
  };

  const handleDownload = (id) => {
    console.log(`Downloading file with id: ${id}`);
  };

  const handleDeleteInterval = () => {
    // Implement data deletion based on the time interval
    console.log(`Deleting data older than: ${deleteInterval}`);
  };

  const handleRowSelectionUserLogs = (id) => {
    const newSelectionModel = userLogSelectionModel.includes(id)
      ? userLogSelectionModel.filter((item) => item !== id)
      : [...userLogSelectionModel, id];

    setUserLogSelectionModel(newSelectionModel);
    setIsAllSelectedUserLogs(newSelectionModel.length === userLogs.length);
  };

  const handleSelectAllUserLogs = () => {
    if (isAllSelectedUserLogs) {
      setUserLogSelectionModel([]);
    } else {
      setUserLogSelectionModel(userLogs.map((row) => row.id));
    }
    setIsAllSelectedUserLogs(!isAllSelectedUserLogs);
  };

  const handleRowSelectionVehicleLogs = (id) => {
    const newSelectionModel = vehicleLogSelectionModel.includes(id)
      ? vehicleLogSelectionModel.filter((item) => item !== id)
      : [...vehicleLogSelectionModel, id];

    setVehicleLogSelectionModel(newSelectionModel);
    setIsAllSelectedVehicleLogs(newSelectionModel.length === vehicleLogs.length);
  };

  const handleSelectAllVehicleLogs = () => {
    if (isAllSelectedVehicleLogs) {
      setVehicleLogSelectionModel([]);
    } else {
      setVehicleLogSelectionModel(vehicleLogs.map((row) => row.id));
    }
    setIsAllSelectedVehicleLogs(!isAllSelectedVehicleLogs);
  };

  const handleRowSelectionPictures = (id) => {
    const newSelectionModel = pictureSelectionModel.includes(id)
      ? pictureSelectionModel.filter((item) => item !== id)
      : [...pictureSelectionModel, id];

    setPictureSelectionModel(newSelectionModel);
    setIsAllSelectedPictures(newSelectionModel.length === pictures.length);
  };

  const handleSelectAllPictures = () => {
    if (isAllSelectedPictures) {
      setPictureSelectionModel([]);
    } else {
      setPictureSelectionModel(pictures.map((row) => row.id));
    }
    setIsAllSelectedPictures(!isAllSelectedPictures);
  };

  const userLogColumns = [
    {
      field: 'selection',
      headerName: '',
      width: 70,
      renderHeader: () => (
        <Checkbox
          checked={isAllSelectedUserLogs}
          onChange={handleSelectAllUserLogs}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={userLogSelectionModel.includes(params.row.id)}
          onChange={() => handleRowSelectionUserLogs(params.row.id)}
        />
      ),
    },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'userName', headerName: 'User Name', width: 150 },
    { field: 'logDate', headerName: 'Log Date', width: 160 },
    { field: 'logTime', headerName: 'Log Time', width: 160 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDownload(params.id)}>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const vehicleLogColumns = [
    {
      field: 'selection',
      headerName: '',
      width: 70,
      renderHeader: () => (
        <Checkbox
          checked={isAllSelectedVehicleLogs}
          onChange={handleSelectAllVehicleLogs}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={vehicleLogSelectionModel.includes(params.row.id)}
          onChange={() => handleRowSelectionVehicleLogs(params.row.id)}
        />
      ),
    },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'vehicleId', headerName: 'Vehicle ID', width: 150 },
    { field: 'logDate', headerName: 'Log Date', width: 160 },
    { field: 'logTime', headerName: 'Log Time', width: 160 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDownload(params.id)}>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const pictureColumns = [
    {
      field: 'selection',
      headerName: '',
      width: 70,
      renderHeader: () => (
        <Checkbox
          checked={isAllSelectedPictures}
          onChange={handleSelectAllPictures}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={pictureSelectionModel.includes(params.row.id)}
          onChange={() => handleRowSelectionPictures(params.row.id)}
        />
      ),
    },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'picture', headerName: 'Picture Filename', width: 150 },
    { field: 'uploadedDate', headerName: 'Uploaded Date', width: 160 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDownload(params.id)}>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Storage Management</Typography>
      <Box sx={{ my: 2 }}>
        <StorageUsage />
      </Box>
      <Divider />
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Storage Details</Typography>
        <Button className='text-white' variant="contained" startIcon={<UploadIcon />} onClick={handleUpload}>
          Upload
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',  // Adjust height here
              },
              '& .MuiOutlinedInput-root': {
                width: '120px',  // Adjust width here
              },
            }}
            label="Time Frame"
            variant="outlined"
            fullWidth
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            select
          >
            <MenuItem value="1_day">Last 24 Hours</MenuItem>
            <MenuItem value="1_week">Last Week</MenuItem>
            <MenuItem value="1_month">Last Month</MenuItem>
            <MenuItem value="1_year">Last Year</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',  // Adjust height here
              },
              '& .MuiOutlinedInput-root': {
                width: '120px',  // Adjust width here
              },
            }}
            label="Delete Interval"
            variant="outlined"
            fullWidth
            value={deleteInterval}
            onChange={(e) => setDeleteInterval(e.target.value)}
            select
          >
            <MenuItem value="1_day">Every 24 Hours</MenuItem>
            <MenuItem value="1_week">Every Week</MenuItem>
            <MenuItem value="1_month">Every Month</MenuItem>
            <MenuItem value="1_year">Every Year</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="secondary" onClick={handleDeleteInterval} className='text-white'>
            Apply Delete Interval
          </Button>
        </Grid>
      </Grid>

      {/* User Logs Section */}
      <Box sx={{ height: 400, width: '100%', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Logging Details
        </Typography>
        <DataGrid
          rows={userLogs}
          columns={userLogColumns}
          pageSize={5}
        />
      </Box>

      {/* Vehicle Logs Section */}
      <Box sx={{ height: 400, width: '100%', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Vehicle Logging Details
        </Typography>
        <DataGrid
          rows={vehicleLogs}
          columns={vehicleLogColumns}
          pageSize={5}
        />
      </Box>

      {/* Pictures Section */}
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Uploaded Pictures
        </Typography>
        <DataGrid
          rows={pictures}
          columns={pictureColumns}
          pageSize={5}
        />
      </Box>
    </Box>
  );
}

export default StorageManagement;
