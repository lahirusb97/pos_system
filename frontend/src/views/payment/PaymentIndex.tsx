import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function PaymentIndex() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (invoiceNumber.trim()) {
      navigate(`/payment/${invoiceNumber}`);
    } else {
      alert("Please enter a valid invoice number.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
        gap={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Enter Invoice Number
        </Typography>

        <TextField
          label="Invoice Number"
          variant="outlined"
          fullWidth
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigate}
          fullWidth
        >
          Search Payments
        </Button>
      </Box>
    </Container>
  );
}
