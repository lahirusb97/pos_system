import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import CategoryIndex from "./CategoryIndex";
import { useAddCategoryMutation } from "../../apislice/categoryApiSlice";
import { extractErrorMessage } from "../../util/extractErrorMessage";

interface CategoryFormData {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

const CategoryForm = () => {
  const [AddCategory, { isLoading, isError, isSuccess }] =
    useAddCategoryMutation();

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

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await AddCategory(data).unwrap();

      toast.success("Category added successfully");
      reset(); // Reset form after successful submission
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Category
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
          Add Category
        </Button>
      </Box>
      <CategoryIndex />
    </Container>
  );
};

export default CategoryForm;
