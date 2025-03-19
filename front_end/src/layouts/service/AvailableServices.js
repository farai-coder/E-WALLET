import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  Divider,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';

// Sample data for services
const services = [
  { id: 1, name: 'Ngaa Investment', price: '$10/month', provider: 'Food Services' },
  { id: 2, name: 'University Of Zimbabwe', price: '$1500/year', provider: 'Education' },
  { id: 3, name: 'Chikwanje Printing Shop', price: '$0.10/page', provider: 'Printing Services' },
  { id: 4, name: 'Chicken Inn', price: '$5/meal', provider: 'Fast Food' },
  { id: 5, name: 'Bakers Inn', price: '$3/pastry', provider: 'Bakery' },
];

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: '16px',
  marginBottom: '16px',
  boxShadow: theme.shadows[4],
  borderRadius: '12px',
  backgroundColor: '#ffffff',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AvailableServices = () => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1A35FF', marginBottom: 2 }}>
        Available Services
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        label="Filter by Service Name"
        value={filter}
        onChange={handleFilterChange}
        sx={{ marginBottom: 2 }}
      />

      <StyledCard>
        <List>
          {filteredServices.map(service => (
            <React.Fragment key={service.id}>
              <StyledListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#1A35FF' }}>{service.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography variant="h6">{service.name}</Typography>} 
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      Price: {service.price} | Provider: {service.provider}
                    </Typography>
                  } 
                />
              </StyledListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </StyledCard>
    </Box>
  );
};

export default AvailableServices;
