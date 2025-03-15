import React, { useState, ChangeEvent, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Pagination,
  Box,
  IconButton,
} from "@mui/material";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
} from "../../apislice/orderApiSlice";
import { debounce } from "lodash";
import { Delete, Fullscreen } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { dateAndTimeFormat } from "../../util/dateAndTimeFormat";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../util/extractErrorMessage";

export default function InvoiceTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // Fetch orders using the query hook
  const { data, error, isLoading, refetch } = useGetOrderQuery({
    page: page, // Adjust for pagination (API might be 1-indexed)
    limit: 10,
    search: debouncedSearch,
  });
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleSearchDebounce = useCallback(
    debounce((query: string) => {
      setDebouncedSearch(query);
    }, 500), // 500ms delay
    []
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearchDebounce(e.target.value);
  };
  const handleOrderDelete = async (orderId: number) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully!");
    } catch (error) {
      extractErrorMessage(error);
      console.log(error);
    }
  };
  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data</Typography>;

  return (
    <TableContainer component={Paper} sx={{ mt: 2, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Invoice List
      </Typography>

      {/* Search Input */}

      <TextField
        size="small"
        label="Search"
        variant="outlined"
        placeholder="Product Name"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>action</TableCell>
            <TableCell>No.</TableCell>
            {/* <TableCell>Date</TableCell> */}
            <TableCell>Customer</TableCell>
            <TableCell>Total (Rs)</TableCell>

            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.results.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <IconButton
                  onClick={() => {
                    handleOrderDelete(invoice.id);
                  }}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  onClick={() => {
                    navigate(`/view/${invoice.id}`);
                  }}
                >
                  <Fullscreen />
                </IconButton>
              </TableCell>
              <TableCell>{invoice.id}</TableCell>
              {/* <TableCell>{dateAndTimeFormat(invoice.created_at)}</TableCell> */}
              <TableCell>{invoice.customer.name}</TableCell>
              <TableCell>{invoice.total}</TableCell>
              <TableCell>{invoice.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pagination
          count={Math.ceil((data?.count || 10) / 10)}
          onChange={(e: ChangeEvent<unknown>, value: number) => {
            setPage(value);
            refetch();
          }}
        />
      </Box>
    </TableContainer>
  );
}
