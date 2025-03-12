import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axiosClient from "../../axiosClient"; // Import your Axios instance
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import useGetSingleCategory from "../../hooks/useGetSingleCategory";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

interface CategoryFormData {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleCategory, singleCategoryLoading } = useGetSingleCategory(id);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (!singleCategoryLoading) {
      reset({
        name: singleCategory?.name || "",
      });
    }
  }, [singleCategory]);
  const onSubmit = async (data: CategoryFormData) => {
    try {
      await axiosClient.patch(`/category/${id}/`, data);
      reset(); // Reset form after successful submission
      navigate(-1);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 400)
          toast.error(
            error.response?.data?.name[0] || "Failed to add category"
          );
      } else {
        toast.error("Check your Internet Conection or try other Name ");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Update Category
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Category Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Category Name"
              fullWidth
              error={!!errors.name}
            />
          )}
        />
        {errors.name && (
          <Typography color="error">{errors.name.message}</Typography>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Category
        </Button>
      </Box>
    </Container>
  );
};

export default CategoryUpdate;
