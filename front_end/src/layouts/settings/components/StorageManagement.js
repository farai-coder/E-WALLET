import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Divider, TextField, MenuItem, Grid } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid } from '@mui/x-data-grid';
import StorageUsage from './StorageUsage';

function StorageManagement() {
  const [rows, setRows] = useState([
    { id: 1, name: 'file1.jpg', size: '2MB', type: 'Image', modified: '2024-07-28' },
    { id: 2, name: 'file2.pdf', size: '3MB', type: 'Document', modified: '2024-07-27' },
    { id: 3, name: 'file3.mp4', size: '15MB', type: 'Video', modified: '2024-07-26' },
    { id: 4, name: 'file4.docx', size: '1.5MB', type: 'Document', modified: '2024-07-25' },
    { id: 5, name: 'file5.png', size: '3.5MB', type: 'Image', modified: '2024-07-24' },
    { id: 6, name: 'file6.zip', size: '10MB', type: 'Archive', modified: '2024-07-23' },
    { id: 7, name: 'file7.mp3', size: '4MB', type: 'Audio', modified: '2024-07-22' },
    { id: 8, name: 'file8.txt', size: '500KB', type: 'Text', modified: '2024-07-21' },
  ]);

  const [timeFrame, setTimeFrame] = useState('');
  const [deleteInterval, setDeleteInterval] = useState('');

  const handleUpload = () => {
    // Implement file upload functionality
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleDownload = (id) => {
    console.log(`Downloading file with id: ${id}`);
  };

  const handleDeleteInterval = () => {
    // Implement data deletion based on the time interval
    console.log(`Deleting data older than: ${deleteInterval}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'File Name', width: 150 },
    { field: 'size', headerName: 'Size', width: 110 },
    { field: 'type', headerName: 'Type', width: 110 },
    { field: 'modified', headerName: 'Last Modified', width: 160 },
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
        <Button variant="contained" startIcon={<UploadIcon />} onClick={handleUpload}>
          Upload
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
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
          <Button variant="contained" color="secondary" onClick={handleDeleteInterval}>
            Apply Delete Interval
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Box>
    </Box>
  );
}

export default StorageManagement;
