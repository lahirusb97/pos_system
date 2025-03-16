import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useGetSingleOrderQuery,
  useUpdatePaymentMutation,
} from "../../apislice/orderApiSlice";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { dateAndTimeFormat } from "../../util/dateAndTimeFormat";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../util/extractErrorMessage";

export default function PaymentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: invoice,
    error,
    isLoading,
  } = useGetSingleOrderQuery(Number(id));

  const [addPayment, { isLoading: isSubmitting }] = useUpdatePaymentMutation();

  const [paymentAmount, setPaymentAmount] = useState("");
  useEffect(() => {
    console.log(isLoading, error);

    if (!isLoading && error) {
      navigate(-1);
      extractErrorMessage(error);
    }
  }, [error, isLoading]);
  if (isLoading) return <CircularProgress />;

  const handlePaymentSubmit = async () => {
    if (invoice) {
      if (!paymentAmount || Number(paymentAmount) <= 0) {
        toast.error("Please enter a valid payment amount.");
        return;
      }

      if (Number(paymentAmount) > invoice?.balance) {
        toast.error("Payment amount exceeds invoice balance.");
        return;
      }

      try {
        await addPayment({
          order: invoice?.id,
          amount: Number(paymentAmount),
        }).unwrap();

        toast.success("Payment processed successfully.");
        setPaymentAmount(""); // Reset input field after success
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Customer & Invoice Details */}
      <Paper elevation={3} sx={{ p: 1, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Invoice #{invoice?.id}
        </Typography>
        <Typography>
          <strong>Customer:</strong> {invoice?.customer.name}
        </Typography>
        <Typography>
          <strong>Contact:</strong> {invoice?.customer.mobile}
        </Typography>
        <Typography>
          <strong>Invoice Date:</strong>{" "}
          {dateAndTimeFormat(invoice?.created_at.toString())}
        </Typography>
      </Paper>

      {/* Items List */}
      <Typography variant="subtitle2" gutterBottom>
        Items Purchased
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Product</strong>
              </TableCell>
              <TableCell>
                <strong>Quantity</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice?.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>Rs. {item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Invoice Summary */}
      <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
        <Typography>
          <strong>Subtotal:</strong> Rs. {invoice?.sub_total}
        </Typography>
        <Typography>
          <strong>Discount:</strong> Rs. {invoice?.discount}
        </Typography>
        <Typography>
          <strong>Balance:</strong> Rs. {invoice?.balance}
        </Typography>
      </Paper>

      {/* Payments List */}
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Payments
      </Typography>
      {invoice && (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice?.payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {new Date(payment.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>Rs. {payment.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Final Balance */}
      <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: "center" }}>
        <Typography variant="h6">
          Remaining Balance: <strong>Rs. {invoice?.balance}</strong>
        </Typography>
      </Paper>

      {/* Payment Input Field */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <TextField
          label="Enter Payment Amount"
          variant="outlined"
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          sx={{ mb: 2, width: "50%" }}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Add Payment"}
        </Button>
      </Box>
    </Container>
  );
}
