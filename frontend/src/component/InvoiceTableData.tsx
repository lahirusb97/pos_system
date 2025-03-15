import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Chip,
  IconButton,
  Box,
  useTheme,
  useMediaQuery, // Added Box for responsive layout
} from "@mui/material";
import { Edit } from "@mui/icons-material";

export default function InvoiceTableData({ invoices }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Invoice List
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total (Rs)</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>{invoice.customer.name}</TableCell>
                  <TableCell>{invoice.total}</TableCell>
                  <TableCell>{invoice.discount}</TableCell>
                  <TableCell>{invoice.balance}</TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status}
                      color={
                        invoice.status === "pending" ? "warning" : "success"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={invoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
