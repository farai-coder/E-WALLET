import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Modal,
  Backdrop,
  Divider,
  TextField,
} from "@mui/material";

const PendingPayments = () => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filter, setFilter] = useState({
    date: "",
    amount: "",
    method: "",
    status: "",
    account: "",
    reason: "",
  });

  const handleOpenDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setOpenDetailsModal(false);
    setSelectedTransaction(null);
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const pendingPayments = [
    {
      id: 1,
      date: "2023-03-15",
      amount: 75.0,
      method: "PayPal",
      status: "Pending",
      account: "user@example.com",
      reason: "Refund Processing",
    },
    {
      id: 2,
      date: "2023-02-25",
      amount: 150.0,
      method: "Bank Transfer",
      status: "Pending",
      account: "1234567890",
      reason: "Service Fee",
    },
    {
      id: 3,
      date: "2023-01-30",
      amount: 200.0,
      method: "Credit Card",
      status: "Pending",
      account: "XXXX-XXXX-XXXX-5678",
      reason: "Deposit",
    },
  ];

  const filteredPayments = pendingPayments.filter((transaction) => {
    return (
      (!filter.date || transaction.date.includes(filter.date)) &&
      (!filter.amount || transaction.amount.toString().includes(filter.amount)) &&
      (!filter.method || transaction.method.toLowerCase().includes(filter.method.toLowerCase())) &&
      (!filter.status || transaction.status.toLowerCase().includes(filter.status.toLowerCase())) &&
      (!filter.account || transaction.account.includes(filter.account)) &&
      (!filter.reason || transaction.reason.toLowerCase().includes(filter.reason.toLowerCase()))
    );
  });

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom align="center">
        Pending Payments
      </Typography>
      
      {/* Filter Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Filter Transactions
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(filter).map((key) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                variant="outlined"
                name={key}
                value={filter[key]}
                onChange={handleFilterChange}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {filteredPayments.map((transaction) => (
          <Grid item xs={12} sm={6} md={4} key={transaction.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {transaction.method}
                </Typography>
                <Typography color="textSecondary" fontSize="0.9rem">
                  {transaction.date}
                </Typography>
                <Typography variant="h5">${transaction.amount.toFixed(2)}</Typography>
                <Typography fontSize="0.9rem" color="orange">Status: {transaction.status}</Typography>
                <Typography fontSize="0.9rem">Account: {transaction.account}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenDetails(transaction)}
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                  className="text-white"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Transaction Details Modal */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseDetails}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-30%, -10%)",
            width: "80%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            borderRadius: 8,
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
            p: 3,
          }}
        >
          {selectedTransaction && (
            <>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                fontFamily="'Roboto', sans-serif"
                fontSize="1.2rem"
              >
                Transaction Details
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography fontFamily="'Roboto', sans-serif" fontSize="0.9rem">
                <strong>Date:</strong> {selectedTransaction.date}
              </Typography>
              <Typography fontFamily="'Roboto', sans-serif" fontSize="0.9rem">
                <strong>Amount:</strong> ${selectedTransaction.amount.toFixed(2)}
              </Typography>
              <Typography fontFamily="'Roboto', sans-serif" fontSize="0.9rem">
                <strong>Method:</strong> {selectedTransaction.method}
              </Typography>
              <Typography fontFamily="'Roboto', sans-serif" fontSize="0.9rem">
                <strong>Status:</strong> {selectedTransaction.status}
              </Typography>
              <Typography fontFamily="'Roboto', sans-serif" fontSize="0.9rem">
                <strong>Account:</strong> {selectedTransaction.account}
              </Typography>
              <Typography fontFamily="'Roboto', sans-serif" fontSize="0.9rem">
                <strong>Reason for Payment:</strong> {selectedTransaction.reason}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseDetails}
                sx={{ marginTop: 2, width: "100%" }}
                className="text-white"
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PendingPayments;
