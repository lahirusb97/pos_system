import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Paper,
} from "@mui/material";
import axiosClient from "../../axiosClient"; // Import your Axios instance

import DropdownInput from "../../component/DropdownInput";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import schemaProduct, { ProductFormZod } from "../../schema/schemaProduct";
import { extractErrorMessage } from "../../util/extractErrorMessage";
import { useAddProductMutation } from "../../apislice/productApiSlice";
import { useGetCategoryQuery } from "../../apislice/categoryApiSlice";

const ProductCreate = () => {
  // const { category, categoryLoading } = useGetCategory();
  const {
    data: category,
    error,
    isLoading: categoryLoading,
  } = useGetCategoryQuery({ page: 1, limit: 1, search: "" });
  const [addProduct, { isLoading, isError, isSuccess }] =
    useAddProductMutation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormZod>({
    resolver: zodResolver(schemaProduct),
    defaultValues: {
      name: "",
      normal_price: undefined,
      max_price: undefined,
      cost: undefined,
      qty: undefined,
      note: "",
      category: undefined,
    },
  });

  const onSubmit = async (data: ProductFormZod) => {
    try {
      await addProduct(data).unwrap();
      // await axiosClient.post("/products/", data);
      reset();
      toast.success("Product added successfully");
    } catch (error) {
      extractErrorMessage(error);
      console.log(error);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "600px",
        mx: "auto",
        p: 1,
        mt: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Add Product
      </Typography>

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
              defaultId={watch("category")}
              error={!!errors.category}
              helperText={errors.category?.message || ""}
            />
          )}
        />
      </FormControl>
      <TextField
        {...register("name")}
        label="Product Name"
        type="text"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message || ""}
      />
      <TextField
        {...register("normal_price", { valueAsNumber: true })}
        label="Normal Price"
        type="number"
        fullWidth
        error={!!errors.normal_price}
        helperText={errors.normal_price?.message || ""}
      />

      <TextField
        {...register("max_price", { valueAsNumber: true })}
        label="Max Price"
        type="number"
        fullWidth
        error={!!errors.max_price}
        helperText={errors.max_price?.message || ""}
      />
      <TextField
        {...register("cost", { valueAsNumber: true })}
        label="Cost"
        type="number"
        fullWidth
        error={!!errors.cost}
        helperText={errors.cost?.message || ""}
      />
      <TextField
        {...register("qty", { valueAsNumber: true })}
        label="Quantity"
        type="number"
        fullWidth
        error={!!errors.qty}
        helperText={errors.qty?.message || ""}
      />
      <TextField
        {...register("note")}
        label="note "
        type="text"
        fullWidth
        error={!!errors.note}
        helperText={errors.note?.message || ""}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Product
      </Button>
    </Paper>
  );
};

export default ProductCreate;
