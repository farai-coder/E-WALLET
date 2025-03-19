import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState("visa");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (paymentMethod === "other" && !amount) {
      newErrors.amount = "Amount is required";
    } else if (paymentMethod === "other" && amount <= 0) {
      newErrors.amount = "Amount must be positive";
    }

    if (!reason) {
      newErrors.reason = "Reason for payment is required";
    }

    if (!accountNumber) {
      newErrors.accountNumber = "Account number is required";
    } else if (selectedPaymentType === "ecocash" && !/^\+263[0-9]{9}$/.test(accountNumber)) {
      newErrors.accountNumber = "Invalid phone number";
    }

    if (!selectedPaymentType) {
      newErrors.paymentType = "Payment type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ amount, reason, paymentMethod, accountNumber, selectedPaymentType });
      // Add payment processing logic here
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Payment Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
          <RadioGroup
            row
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="credit" control={<Radio />} label="Total Amount Due ($8245)" />
            <FormControlLabel value="other" control={<Radio />} label="Other Amount" />
          </RadioGroup>
        </FormControl>

        {paymentMethod === "other" && (
          <TextField
            label="Enter Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
            error={Boolean(errors.amount)}
            helperText={errors.amount}
            required
          />
        )}

        <TextField
          label="Reason for Payment"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
          margin="normal"
          error={Boolean(errors.reason)}
          helperText={errors.reason}
          required
        />

        <InputLabel id="payment-type-label">Payment Type</InputLabel>
        <Select
          labelId="payment-type-label"
          value={selectedPaymentType}
          onChange={(e) => setSelectedPaymentType(e.target.value)}
          fullWidth
          margin="normal"
          error={Boolean(errors.paymentType)}
          required
        >
          <MenuItem value="visa">Ecocash</MenuItem>
          <MenuItem value="ecocash">Paynow</MenuItem>
          <MenuItem value="ecocash">Visa</MenuItem>
          <MenuItem value="paypal">Zipit</MenuItem>
        </Select>

        <TextField
          label="Account Number"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          fullWidth
          margin="normal"
          error={Boolean(errors.accountNumber)}
          helperText={errors.accountNumber}
          required
        />

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Button variant="text" color="primary">
            Go back
          </Button>
          <Button type="submit" variant="contained" color="primary" className="text-white">
            Pay Amount
          </Button>
        </Box>
      </form>
    </Container>
  );
}
