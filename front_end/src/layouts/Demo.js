import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [mode, setMode] = React.useState('');

  const handleChange = (event) => {
    setMode(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="mode"
          onChange={handleChange}
        >
          <MenuItem value={10}>All</MenuItem>
          <MenuItem value={20}>Staff</MenuItem>
          <MenuItem value={30}>Visitors</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
