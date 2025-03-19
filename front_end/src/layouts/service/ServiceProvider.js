import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Card, Divider, TextField } from '@mui/material';
import { styled } from '@mui/system';

// Sample data for service providers in Mount Pleasant, Zimbabwe
const serviceProviders = [
  { id: 1, name: 'Ngaa Investment', services: ['Accommodation', 'Food'], location: 'Mount Pleasant, Harare' },
  { id: 2, name: 'Bakers Inn', services: ['Food', 'Bakery'], location: 'Mount Pleasant, Harare' },
  { id: 3, name: 'Chicken Inn', services: ['Fast Food', 'Takeout'], location: 'Mount Pleasant, Harare' },
  { id: 4, name: 'Accommodations Plus', services: ['Accommodation', 'Food'], location: 'Mount Pleasant, Harare' },
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

const ServiceProvider = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = serviceProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1A35FF', marginBottom: 2 }}>
        Service Providers in Mount Pleasant
      </Typography>
      <TextField
        label="Search by Provider or Service"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <StyledCard>
        <List>
          {filteredProviders.length > 0 ? (
            filteredProviders.map(provider => (
              <React.Fragment key={provider.id}>
                <StyledListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#1A35FF' }}>{provider.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<Typography variant="h6">{provider.name}</Typography>} 
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        Location: {provider.location} | Services: {provider.services.join(', ')}
                      </Typography>
                    } 
                  />
                </StyledListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', padding: 2 }}>
              No providers found.
            </Typography>
          )}
        </List>
      </StyledCard>
    </Box>
  );
};

export default ServiceProvider;
