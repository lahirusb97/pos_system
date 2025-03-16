import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../apislice/categoryApiSlice";

interface CategoryFormData {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: singleCategory, isLoading: singleCategoryLoading } =
    useGetCategoryByIdQuery(id || "");
  const [updateCategory] = useUpdateCategoryMutation();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCategory]);
  const onSubmit = async (data: CategoryFormData) => {
    try {
      await updateCategory({ id: Number(id), data: data }).unwrap();
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
