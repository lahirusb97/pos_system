import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import DropdownInput from "../../component/DropdownInput";
import toast from "react-hot-toast";
import { ProductForm } from "../../models/ProductForm";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../apislice/productApiSlice";
import { useGetCategoryQuery } from "../../apislice/categoryApiSlice";
import { extractErrorMessage } from "../../util/extractErrorMessage";

// Validation Schema
const productSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  normal_price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Normal price is required"),
  max_price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Max price is required"),
  qty: yup
    .number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  cost: yup
    .number()
    .typeError("Cost must be a number")
    .positive("Cost must be positive")
    .required("Cost is required"),
  note: yup.string().notRequired(),
  category: yup.number().required("Category is required"),
});

export default function ProductUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: singleProduct, isLoading: singleProductLoading } =
    useGetProductByIdQuery(id, {
      skip: isNaN(id), // ✅ Skip query if ID is not a number
    });

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const { data: category, isLoading: categoryLoading } = useGetCategoryQuery({
    page: 1,
    limit: 1,
    search: "",
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (singleProduct) {
      reset({
        name: singleProduct.name,
        normal_price: singleProduct.normal_price,
        max_price: singleProduct.max_price,
        qty: singleProduct.qty,
        cost: singleProduct.cost,
        note: singleProduct.note || "",
        category: singleProduct.category.id,
      });
    }
  }, [singleProduct]);

  const onSubmit = async (data: ProductForm) => {
    try {
      await updateProduct({ id, data }).unwrap();
      toast.success("Product updated successfully");
      reset();
      navigate(-1);
      toast.success("Product updated successfully");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  if (singleProductLoading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Update Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Normal Price"
            margin="normal"
            type="number"
            {...register("normal_price")}
            error={!!errors.normal_price}
            helperText={errors.normal_price?.message}
          />
          <TextField
            fullWidth
            label="Max Price"
            margin="normal"
            type="number"
            {...register("max_price")}
            error={!!errors.max_price}
            helperText={errors.max_price?.message}
          />
          <TextField
            fullWidth
            label="Quantity"
            margin="normal"
            type="number"
            {...register("qty")}
            error={!!errors.qty}
            helperText={errors.qty?.message}
          />
          <TextField
            fullWidth
            label="Cost"
            margin="normal"
            type="number"
            {...register("cost")}
            error={!!errors.cost}
            helperText={errors.cost?.message}
          />
          <TextField
            fullWidth
            label="Note"
            margin="normal"
            {...register("note")}
            error={!!errors.note}
            helperText={errors.note?.message}
          />
          <FormControl fullWidth>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <DropdownInput
                  {...field}
                  options={category?.results || []}
                  onChange={(selectedId) => field.onChange(selectedId)}
                  loading={categoryLoading}
                  labelName="Select Category"
                  defaultId={singleProduct?.category.id || null}
                />
              )}
            />
          </FormControl>
          <Button fullWidth type="submit" variant="contained" disabled={false}>
            {false ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
