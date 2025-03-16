import { useState, ChangeEvent, useCallback } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Typography,
  useTheme,
  Pagination,
  TextField,
} from "@mui/material";
import { useGetCustomersQuery } from "../../apislice/customerApiSlice";
import { numberWithCommas } from "../../util/numberWithCommas";
import { debounce } from "lodash";

export default function CustomerIndex() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;
  const theme = useTheme();
  const {
    data: customers,
    isLoading,
    refetch,
  } = useGetCustomersQuery({ page, limit, search: debouncedSearch });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  if (isLoading) {
    return <>loading....</>;
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Customer Balance List
      </Typography>
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
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflow: "auto",
          maxHeight: "65vh",
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
              {/* <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell> */}
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width={30} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={50} />
                  </TableCell>
                </TableRow>
              ))
            ) : customers ? (
              customers.results.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.mobile}</TableCell>
                  <TableCell>
                    Rs. {numberWithCommas(customer.total_balance)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil((customers?.count || 10) / limit)}
        onChange={(_e: ChangeEvent<unknown>, value: number) => {
          setPage(value);
          refetch();
        }}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
