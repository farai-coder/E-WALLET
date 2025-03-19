import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function VehicleCountModeSelect({ onModeChange }) {
  const [mode, setMode] = React.useState('daily'); // Default mode set to 'daily'
  const [labels, setLabels] = React.useState('Once a Day'); // Default label set to 'Once a Day'

  const handleModeChange = (event) => {
    const newMode = event.target.value;
    setMode(newMode);

    const modeLabels = {
      daily: 'Once a Day',
      multiple: 'Multiple Instances',
    };
    const newLabel = modeLabels[newMode] || '';
    setLabels(newLabel); // Update the label
    onModeChange(newLabel); // Call the callback to pass label to parent
    console.log('Mode selected:', newLabel);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="vehicle-count-mode-label">Count</InputLabel>
        <Select
          labelId="vehicle-count-mode-label"
          id="vehicle-count-mode-select"
          value={mode}
          label="Mode"
          onChange={handleModeChange}
          IconComponent={ArrowDropDownIcon}
          sx={{
            borderRadius: 0, // Remove border radius
            height: 50, // Increase height
            fontSize: 18, // Increase font size
          }}
        >
          <MenuItem value="daily">Multiple Instances</MenuItem>
          <MenuItem value="multiple">Once a Day</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
