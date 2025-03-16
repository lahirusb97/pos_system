// UI Component: ProductDetails.tsx
import { ChangeEvent, useCallback, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Skeleton,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { ProductModel } from "../../models/ProductModel";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../apislice/productApiSlice";
import { debounce } from "lodash";
import { getFromLocalStorage } from "../../util/authDataConver";

export default function ProductDetails() {
  const user = getFromLocalStorage();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { openDialog } = useDeleteDialog();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductQuery({ page, limit: 10, search: debouncedSearch });

  const handleEdit = (id: number) => {
    navigate(`/product/update/${id}`);
  };
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
    <Box sx={{ padding: 2 }}>
      {/* Search Bar */}

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

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: 2, overflowX: "auto" }}
      >
        <Table
          size="small"
          sx={{ minWidth: 650 }}
          aria-label="Product Details Table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Normal Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Max Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Stock Qty</TableCell>
              {user?.is_superuser && (
                <TableCell sx={{ fontWeight: "bold" }}>Cost</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  {[...Array(7)].map((_, i) => (
                    <TableCell key={i}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : products ? (
              products.results.map((row: ProductModel) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton
                      color="warning"
                      onClick={() => handleEdit(row.id)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      disabled={isDeleting}
                      color="error"
                      onClick={() =>
                        openDialog(`/products/${row.id}/`, () =>
                          deleteProduct(row.id).unwrap()
                        )
                      }
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category.name}</TableCell>
                  <TableCell>{row.normal_price}</TableCell>
                  <TableCell>{row.max_price}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  {user?.is_superuser && <TableCell>{row.cost}</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pagination
          count={Math.ceil((products?.count || 10) / 10)}
          onChange={(e: ChangeEvent<unknown>, value: number) => {
            e.preventDefault();
            setPage(value);
            refetch();
          }}
        />
      </Box>
    </Box>
  );
}
