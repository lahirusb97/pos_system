import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../apislice/productApiSlice";
import { useGetCategoryQuery } from "../../apislice/categoryApiSlice";
import { extractErrorMessage } from "../../util/extractErrorMessage";
import schemaProduct, { ProductFormZod } from "../../schema/schemaProduct";

// Validation Schem

export default function ProductUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: singleProduct, isLoading: singleProductLoading } =
    useGetProductByIdQuery(id || "");

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
  } = useForm<ProductFormZod>({
    resolver: zodResolver(schemaProduct),
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

  const onSubmit = async (data: ProductFormZod) => {
    try {
      await updateProduct({ id: Number(id), data }).unwrap();
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
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={updateLoading}
          >
            {updateLoading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
