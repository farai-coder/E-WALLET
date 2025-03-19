import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { BASE_URL } from 'Api';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  boxShadow: theme.shadows[2],
  borderRadius: '8px',
}));

function TransactionSettings() {
  const [activityLogs, setActivityLogs] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [transactionNotifications, setTransactionNotifications] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleToggle = (setter) => (checked) => {
    setter(checked);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/transaction-settings/`)
      .then(response => response.json())
      .then(data => {
        setActivityLogs(data.activity_logs);
        setTwoFA(data.two_fa);
        setTransactionNotifications(data.transaction_notifications);
        setEmailAlerts(data.email_alerts);
      })
      .catch(error => {
        console.error("Error fetching transaction settings:", error);
      });
  }, []);

  return (
    
      <Box sx={{ 
        backgroundColor: "#f9f9f9", 
        minHeight: "100vh", 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
      }}>
        <Box sx={{ maxWidth: '400px', width: '100%' }}>
          
          <StyledCard>
            <CardContent>
              <Typography variant="subtitle1">Transaction Notifications</Typography>
              <Typography color="textSecondary" variant="body2">Receive updates for transaction status changes.</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                <Switch onChange={handleToggle(setTransactionNotifications)} checked={transactionNotifications} />
              </Box>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="subtitle1">2FA Authentication</Typography>
              <Typography color="textSecondary" variant="body2">Two-factor authentication for added security.</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                <Switch onChange={handleToggle(setTwoFA)} checked={twoFA} />
              </Box>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="subtitle1">Email Alerts for Transactions</Typography>
              <Typography color="textSecondary" variant="body2">Get notified via email for transaction updates.</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                <Switch onChange={handleToggle(setEmailAlerts)} checked={emailAlerts} />
              </Box>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="subtitle1">Activity Logs</Typography>
              <Typography color="textSecondary" variant="body2">Keep track of all transaction activities.</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                <Switch onChange={handleToggle(setActivityLogs)} checked={activityLogs} />
              </Box>
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
  );
}

export default TransactionSettings;
