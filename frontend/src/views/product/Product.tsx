import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axiosClient from "../../axiosClient";

import useGetProduct from "../../hooks/useGetProduct";

const Product = () => {
  const { product, productLoading, productError, refresh } = useGetProduct();
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      await axiosClient.delete(`/products/${id}/`);
      refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Normal Price</TableCell>
            <TableCell>Max Price</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.normal_price}</TableCell>
              <TableCell>{product.max_price}</TableCell>
              <TableCell>{product.qty}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/update/${product.id}`)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(product.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Product;
