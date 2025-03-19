import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function BasicSelect({ onModeChange }) {
  const [mode, setMode] = React.useState(10); // Default mode set to 10 (All)
  const [labels, setLabels] = React.useState('All'); // Default label set to 'All'

  const handleModeChange = (event) => {
    const newMode = event.target.value;
    setMode(newMode);

    const modeLabels = {
      10: 'All',
      20: 'Staff',
      30: 'Visitor',
    };
    const newLabel = modeLabels[newMode] || '';
    setLabels(newLabel); // Update the label
    onModeChange(newLabel); // Call the callback to pass label to parent
    console.log('parent called', newLabel);
  };

  console.log('Selected mode:', mode);
  console.log('Labels:', labels);

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="mode"
          onChange={handleModeChange}
          icon={<ArrowDropDownIcon />} // Add this line
          sx={{
            borderRadius: 0, // Remove border radius
            height: 50, // Increase height
            fontSize: 18, // Increase font size
          }}
        >
          <MenuItem value={10}>All</MenuItem>
          <MenuItem value={20}>Staff</MenuItem>
          <MenuItem value={30}>Visitor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}



