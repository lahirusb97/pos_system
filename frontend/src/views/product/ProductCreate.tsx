import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import axiosClient from "../../axiosClient"; // Import your Axios instance
import { useState, useEffect } from "react";
import useGetCategory from "../../hooks/useGetCategory";
import DropdownInput from "../../component/DropdownInput";
interface ProductFormData {
  category: string;
  name: string;
  normal_price: number;
  max_price: number;
  qty: number;
  note: string;
}

const schema = yup.object().shape({
  category: yup.string().required("Category is required"),
  name: yup.string().required("Product name is required"),
  normal_price: yup
    .number()
    .positive()
    .integer()
    .required("Normal price is required"),
  max_price: yup
    .number()
    .positive()
    .integer()
    .required("Max price is required"),
  qty: yup.number().positive().integer().required("Quantity is required"),
  note: yup.string().optional(),
});

const ProductCreate = () => {
  const { category, categoryLoading, categoryError } = useGetCategory();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      name: "",
      normal_price: 0,
      max_price: 0,
      qty: 1,
      note: "",
    },
  });
  console.log(category);

  const onSubmit = async (data: ProductFormData) => {
    try {
      await axiosClient.post("/products/", data);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Category Select Field */}
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <DropdownInput
                {...field}
                options={category.results || []}
                onChange={(selectedId) => field.onChange(selectedId)}
                loading={categoryLoading}
                labelName="Select Category"
                defaultId={null}
              />
            )}
          />
        </FormControl>

        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Product Name"
              fullWidth
              error={!!errors.name}
            />
          )}
        />
        {errors.name && (
          <Typography color="error">{errors.name.message}</Typography>
        )}

        {/* Normal Price Field */}
        <Controller
          name="normal_price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Normal Price"
              type="number"
              fullWidth
              error={!!errors.normal_price}
            />
          )}
        />
        {errors.normal_price && (
          <Typography color="error">{errors.normal_price.message}</Typography>
        )}

        {/* Max Price Field */}
        <Controller
          name="max_price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Max Price"
              type="number"
              fullWidth
              error={!!errors.max_price}
            />
          )}
        />
        {errors.max_price && (
          <Typography color="error">{errors.max_price.message}</Typography>
        )}

        {/* Quantity Field */}
        <Controller
          name="qty"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Quantity"
              type="number"
              fullWidth
              error={!!errors.qty}
            />
          )}
        />
        {errors.qty && (
          <Typography color="error">{errors.qty.message}</Typography>
        )}

        {/* Note Field */}
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Note (Optional)" fullWidth />
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default ProductCreate;
