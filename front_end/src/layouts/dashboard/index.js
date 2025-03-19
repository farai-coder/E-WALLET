import React from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

// Sample Data
const walletOverviewData = {
  totalBalance: 5000,
  activeWallets: 150,
  recentTransactions: [
    { id: 1, type: "Top-Up", amount: 100, date: "2023-03-15" },
    { id: 2, type: "Withdrawal", amount: 50, date: "2023-03-16" },
    { id: 3, type: "Payment", amount: 200, date: "2023-03-17" },
  ],
};

const transactionStatistics = {
  totalTransactions: 300,
  breakdown: {
    payments: 150,
    withdrawals: 100,
    topUps: 50,
  },
};

const pendingTransactionsData = [
  { id: 1, date: "2023-03-18", amount: 200, status: "Pending" },
  { id: 2, date: "2023-03-19", amount: 150, status: "Pending" },
];

const userStatistics = {
  totalUsers: 500,
  newUsersLastWeek: 20,
  activeUsers: 300,
};

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* Wallet Overview */}
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ bgcolor: '#f0f4ff', boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A35FF', fontSize: '1.2rem' }}>
                    Wallet Overview
                  </Typography>
                  <Typography variant="h5" sx={{ marginBottom: 1, fontSize: '1.1rem' }}>
                    Total Wallet Balance: <span style={{ color: '#4caf50' }}>${walletOverviewData.totalBalance}</span>
                  </Typography>
                  
                  <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: 1, fontSize: '0.9rem' }}>
                    Recent Transactions:
                  </Typography>
                  {walletOverviewData.recentTransactions.map((transaction) => (
                    <Typography key={transaction.id} sx={{ fontSize: '0.9rem' }}>
                      {transaction.type} of <span style={{ color: '#f50057' }}>${transaction.amount}</span> on {transaction.date}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Transaction Statistics */}
            <Grid item xs={12} md={6} lg={4}>
              <ReportsBarChart
                color="info"
                title="Transaction Statistics"
                description={`Total Transactions: ${transactionStatistics.totalTransactions}`}
                chart={{
                  labels: ["Payments", "Withdrawals", "Top-Ups"],
                  datasets: {
                    label: "Transactions by Type",
                    data: [
                      transactionStatistics.breakdown.payments,
                      transactionStatistics.breakdown.withdrawals,
                      transactionStatistics.breakdown.topUps,
                    ],
                  },
                }}
              />
            </Grid>

            {/* Pending Transactions */}
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ bgcolor: '#fff3e0', boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff9800', fontSize: '1.2rem' }}>
                    Pending Transactions
                  </Typography>
                  {pendingTransactionsData.map((transaction) => (
                    <Typography key={transaction.id} sx={{ fontSize: '0.9rem' }}>
                      {transaction.date}: <span style={{ color: '#ff5722' }}>${transaction.amount}</span> - {transaction.status}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
