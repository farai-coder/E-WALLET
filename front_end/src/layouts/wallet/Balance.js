/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Icons
import { MonetizationOn, AccountBalance, EventNote } from '@mui/icons-material';

function WalletBalance() {
  const walletInfo = {
    walletId: 'WALLET-123456',
    createdDate: '2023-01-01',
    accountNumber: 'ACC-987654321',
    balance: 2500.75,
    currency: 'USD',
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2, padding: 3, backgroundColor: '#f5f5f5' }}>
      <MDBox textAlign="center" mb={3}>
        <MDTypography variant="h4" fontWeight="bold" color="#333">
          <MonetizationOn sx={{ fontSize: 50, color: '#1A35FF', mr: 1 }} />
          Wallet Information
        </MDTypography>
      </MDBox>
      <MDBox component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
        {[
          { label: 'Wallet ID', value: walletInfo.walletId, icon: <AccountBalance sx={{ color: '#1A35FF' }} /> },
          { label: 'Created Date', value: walletInfo.createdDate, icon: <EventNote sx={{ color: '#1A35FF' }} /> },
          { label: 'Account Number', value: walletInfo.accountNumber },
        ].map((item, index) => (
          <MDBox key={index} component="li" display="flex" justifyContent="space-between" sx={{ padding: 1, mb: 2, borderRadius: 1, backgroundColor: '#fff', boxShadow: 1 }}>
            <MDBox display="flex" alignItems="center">
              {item.icon && <MDBox sx={{ mr: 1 }}>{item.icon}</MDBox>}
              <MDTypography variant="body1" sx={{ fontSize: '1rem' }}><strong>{item.label}:</strong> {item.value}</MDTypography>
            </MDBox>
          </MDBox>
        ))}
      </MDBox>
      <MDBox textAlign="center" mt={3}>
        <MDTypography variant="h5" fontWeight="bold" color="#1A35FF" sx={{ fontSize: '1.25rem' }}>
          <strong>Balance:</strong> {walletInfo.balance.toFixed(2)} {walletInfo.currency}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

export default WalletBalance;
