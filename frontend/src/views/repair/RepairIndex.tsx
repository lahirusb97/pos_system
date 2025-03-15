import { Button, IconButton, TextField } from "@mui/material";
import React, { useCallback, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import {
  useDeleteRepairMutation,
  useGetRepairsQuery,
} from "../../apislice/repairApiSlice";
import { debounce } from "lodash";
import {
  Add,
  AddBoxSharp,
  Collections,
  Delete,
  Edit,
  Money,
  MoneyOffSharp,
  PaymentOutlined,
  Print,
} from "@mui/icons-material";
import { useDeleteDialog } from "../../context/DeleteDialogContext";

export default function RepairIndex() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { openDialog } = useDeleteDialog();
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteRepair, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteRepairMutation(); // ✅ Use the mutation

  const {
    data: repairList,
    error,
    isLoading,
    refetch,
  } = useGetRepairsQuery({
    page,
    limit: 10,
    search: debouncedSearch,
  });
  const handleSearchDebounce = useCallback(
    debounce((query: string) => {
      setDebouncedSearch(query);
    }, 500), // 500ms delay
    []
  );
  const handleEdit = (id: number) => {
    navigate(`/repair/${id}`);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearchDebounce(e.target.value);
  };

  return (
    <div>
      <Button
        sx={{ mt: 1 }}
        variant="contained"
        onClick={() => navigate("create")}
      >
        New Repair
      </Button>
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Repair No.</TableCell>

              <TableCell>
                <b>Customer Name</b>
              </TableCell>
              <TableCell>
                <b>Total Price</b>
              </TableCell>
              <TableCell>
                <b>Balance</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairList?.results.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell>
                  <IconButton
                    color="warning"
                    onClick={() => handleEdit(repair.id)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => navigate(`${repair.id}/invoice`)}
                  >
                    <Print fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => navigate(`${repair.id}/payment`)}
                  >
                    <AddBoxSharp fontSize="small" />
                  </IconButton>
                </TableCell>

                <TableCell>{repair.id}</TableCell>
                <TableCell>{repair.customer.name}</TableCell>
                <TableCell>{repair.total_price}</TableCell>
                <TableCell>{repair.balance}</TableCell>
                <TableCell>
                  {repair.status}
                  <IconButton
                    color="error"
                    onClick={() =>
                      openDialog(`/repairs/${repair.id}/`, () =>
                        deleteRepair(repair.id).unwrap()
                      )
                    }
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil((repairList?.count || 10) / 10)}
        onChange={(e: ChangeEvent<unknown>, value: number) => {
          setPage(value);
          refetch();
        }}
      />
    </div>
  );
}
