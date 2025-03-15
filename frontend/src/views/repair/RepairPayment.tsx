import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Box,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router";
import {
  useAddRepairPaymentMutation,
  useGetRepairQuery,
} from "../../apislice/repairApiSlice";
import { dateAndTimeFormat } from "../../util/dateAndTimeFormat";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../util/extractErrorMessage";

export default function RepairPayment() {
  const { id } = useParams<{ id: string }>();
  const {
    data: repair,
    error,
    isLoading,
    refetch,
  } = useGetRepairQuery(Number(id));
  const [addRepairPayment, { isLoading: isPaying }] =
    useAddRepairPaymentMutation();
  const [paymentAmount, setPaymentAmount] = useState<number>("");

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading repair details.</p>;

  const handlePayment = async () => {
    try {
      await addRepairPayment({
        repair: Number(id),
        amount: paymentAmount,
      }).unwrap();
      setPaymentAmount(""); // Reset field after successful payment
      refetch();
      toast.success("Payment processed successfully.");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ padding: 3, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Repair Payment Details
        </Typography>

        {/* Customer Details */}
        <Typography>
          <strong>Customer Name:</strong> {repair?.customer.name}
        </Typography>
        <Typography>
          <strong>Mobile:</strong> {repair?.customer.mobile}
        </Typography>
        <Typography>
          <strong>Date:</strong> {dateAndTimeFormat(repair?.created_at)}
        </Typography>

        {/* Repair Details */}
        <Typography sx={{ mt: 2 }}>
          <strong>Repair Issue:</strong> {repair?.repair_issue}
        </Typography>
        <Typography>
          <strong>Status:</strong> {repair?.status}
        </Typography>
        <Typography>
          <strong>Note:</strong> {repair?.note || "N/A"}
        </Typography>

        <Typography>
          <strong>Total Price: Rs. </strong> {repair?.total_price}
        </Typography>
        <Typography color="error">
          <strong>Remaining Balance:Rs. </strong> {repair?.balance}
        </Typography>

        {/* Payment Section */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Make a Payment
        </Typography>
        <TextField
          label="Payment Amount"
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 1 }}
          disabled={
            isPaying || paymentAmount <= 0 || paymentAmount > repair.balance
          }
          onClick={handlePayment}
        >
          {isPaying ? "Processing..." : "Pay Now"}
        </Button>

        {/* Payment History */}
        <Typography variant="h6" sx={{ mt: 1 }}>
          Payment History
        </Typography>
        <List>
          {repair?.payments.map((payment) => (
            <ListItem sx={{ m: 0, p: 0 }} key={payment.id}>
              <ListItemText
                primary={`Rs. ${payment.amount}`}
                secondary={dateAndTimeFormat(payment.created_at)}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
