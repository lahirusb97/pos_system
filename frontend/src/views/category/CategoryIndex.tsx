import { ChangeEvent, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../apislice/categoryApiSlice";

export default function CategoryIndex() {
  const [page, setPage] = useState(1);
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const {
    data: category,
    isLoading: categoryLoading,
    refetch,
  } = useGetCategoryQuery({
    page: page,
    limit: 10,
  });
  const { openDialog } = useDeleteDialog();
  const theme = useTheme();
  const navigate = useNavigate();
  if (categoryLoading) {
    return <>loading....</>;
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Category List
      </Typography>

      {/* Responsive Table Container */}
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
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              {/* <TableCell sx={{ fontWeight: "bold" }}>Total Product</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryLoading ? (
              [...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width={30} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={50} />
                  </TableCell>
                </TableRow>
              ))
            ) : category ? (
              category?.results.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/category/update/${row.id}/`)}
                      sx={{
                        "&:hover": { color: theme.palette.primary.dark },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      disabled={isLoading}
                      onClick={() =>
                        openDialog(`/category/${row.id}/`, () =>
                          deleteCategory(row.id.toString()).unwrap()
                        )
                      }
                      sx={{
                        "&:hover": { color: theme.palette.primary.dark },
                      }}
                    >
                      <Delete color="error" fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  {/* <TableCell>{row.product_count}</TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No matching records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil((category?.count || 10) / 10)}
        onChange={(_e: ChangeEvent<unknown>, value: number) => {
          setPage(value);
          refetch();
        }}
      />
    </Box>
  );
}
