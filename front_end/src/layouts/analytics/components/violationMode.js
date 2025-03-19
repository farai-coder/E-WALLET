import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ViolationModeSelect({ onModeChange }) {
  const [mode, setMode] = React.useState('violation'); // Default mode set to 'violation'
  const [labels, setLabels] = React.useState('Violation'); // Default label set to 'Violation'

  const handleModeChange = (event) => {
    const newMode = event.target.value;
    setMode(newMode);

    const modeLabels = {
      violation: 'Violation',
      nonViolation: 'Non-Violation',
    };
    const newLabel = modeLabels[newMode] || '';
    setLabels(newLabel); // Update the label
    onModeChange(newLabel); // Call the callback to pass label to parent
    console.log('Mode selected:', newLabel);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="violation-mode-label">Mode</InputLabel>
        <Select
          labelId="violation-mode-label"
          id="violation-mode-select"
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
          <MenuItem value="violation">Non-Violation</MenuItem>
          <MenuItem value="nonViolation">Violation</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
