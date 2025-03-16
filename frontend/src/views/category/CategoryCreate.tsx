import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import CategoryIndex from "./CategoryIndex";
import { useAddCategoryMutation } from "../../apislice/categoryApiSlice";
import { extractErrorMessage } from "../../util/extractErrorMessage";
import schemaCategory, { CategoryFormZod } from "../../schema/schemaCategory";
import { zodResolver } from "@hookform/resolvers/zod";

const CategoryForm = () => {
  const [AddCategory, { isLoading }] = useAddCategoryMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryFormZod>({
    resolver: zodResolver(schemaCategory),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryFormZod) => {
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
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {isLoading ? "Adding..." : "Add Category"}
        </Button>
      </Box>
      <CategoryIndex />
    </Container>
  );
};

export default CategoryForm;
