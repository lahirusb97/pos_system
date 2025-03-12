import React, { useState } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import ProductAutoSelect from "../../component/ProductAutoSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProducts,
  removeProduct,
  setProduct,
} from "../../store/features/productSlice";
import { RootState } from "../../store/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductModel } from "../../models/ProductModel";
import schemaInvoice, { invoiceFormZod } from "../../schema/schemaInvoice";
import { Delete } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useAddOrderMutation } from "../../apislice/orderApiSlice";
import { extractErrorMessage } from "../../util/extractErrorMessage";
const Invoice = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(
    null
  );
  const productSelected = useSelector(
    (state: RootState) => state.invoice_product_filter.selectedProductList
  );
  const ProductSelectedArray = Object.values(productSelected);
  const subTotal = Object.values(ProductSelectedArray).reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaInvoice),
  });
  const [addOrder, { isLoading }] = useAddOrderMutation();

  const handleInvoice = async (data: invoiceFormZod) => {
    if (ProductSelectedArray.length > 0) {
      try {
        await addOrder({ ...data, products: ProductSelectedArray }).unwrap();
        toast.success("invoice saved");
        reset();
        dispatch(clearProducts());
      } catch (error) {
        extractErrorMessage(error);
      }
    } else {
      toast.error("0 Product Added ");
    }
    console.log(data);
  };

  return (
    <Container
      onSubmit={handleSubmit(handleInvoice)}
      component={"form"}
      maxWidth="md"
      sx={{ mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Invoice
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          {...register("customer_name")}
          type="text"
          size="small"
          label="Customer Name"
          error={!!errors.customer_name}
          helperText={errors.customer_name?.message || ""}
        />
        <TextField
          {...register("mobile")}
          type="text"
          size="small"
          label="Contact"
          error={!!errors.mobile}
          helperText={errors.mobile?.message || ""}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 1,
          gap: 1,
        }}
      >
        <ProductAutoSelect
          value={selectedProduct}
          onSelect={(product) => {
            setSelectedProduct(product);
            setPrice(product.normal_price);
          }}
          onReset={() => {
            setSelectedProduct(null);
            setPrice(0);
          }} // Reset function
        />
        <TextField
          size="small"
          label="Item Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          onFocus={(e) => {
            if (e.target.value === "0") {
              setPrice("");
            }
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setPrice(0);
            }
          }}
        />
        <Button
          onClick={() => {
            if (selectedProduct) {
              dispatch(
                setProduct({
                  product_id: selectedProduct.id,
                  name: selectedProduct.name,
                  price: price,
                  quantity: 1,
                })
              );
              setSelectedProduct(null);
              setPrice(0);
            }
          }}
        >
          Add
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit </TableCell>
              <TableCell align="right">Value </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ProductSelectedArray.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell>
                  <IconButton
                    onClick={() => dispatch(removeProduct(product.product_id))}
                  >
                    <Delete />
                  </IconButton>
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  {product.quantity * product.price}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell align="right" colSpan={3}>
                Subtotal
              </TableCell>
              <TableCell align="right" colSpan={1}>
                {subTotal}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={3}>
                Discount
              </TableCell>
              <TableCell align="right" colSpan={1}>
                {Number(watch("discount") || 0)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={3}>
                Total
              </TableCell>
              <TableCell align="right" colSpan={1}>
                {subTotal - Number(watch("discount") || 0)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={3}>
                Balance
              </TableCell>
              <TableCell align="right" colSpan={1}>
                {subTotal -
                  (Number(watch("discount") || 0) +
                    Number(watch("payment_amount") || 0))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TextField
        {...register("discount", { valueAsNumber: true })}
        label="Discount ($)"
        type="number"
        fullWidth
        margin="normal"
        error={!!errors.discount}
        helperText={errors.discount?.message || ""}
      />

      <TextField
        {...register("payment_amount", { valueAsNumber: true })}
        label="Payment (Rs)"
        type="number"
        fullWidth
        margin="normal"
        error={!!errors.payment_amount}
        helperText={errors.payment_amount?.message || ""}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {/* Balance: ${balance.toFixed(2)} */}
      </Typography>
      <Button disabled={isLoading} variant="contained" type="submit">
        {isLoading ? "loading..." : "Invoice"}
      </Button>
    </Container>
  );
};

export default Invoice;
