import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import repairSchema, { RepairFormZod } from "../../schema/schemarepair";
import { useAddRepairMutation } from "../../apislice/repairApiSlice";
import { extractErrorMessage } from "../../util/extractErrorMessage";
import toast from "react-hot-toast";

// ✅ Zod Schema for validation

export default function RepairCreate() {
  const [addRepair, { isLoading }] = useAddRepairMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(repairSchema),
    defaultValues: {
      status: "pending", // ✅ Default status
      cost: 0,
      total_price: 0,
    },
  });

  const onSubmit = async (data: RepairFormZod) => {
    try {
      await addRepair(data).unwrap();
      toast.success("Repair added successfully for " + data.customer_name);
      reset();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Repair Order
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Customer Name"
            fullWidth
            margin="normal"
            {...register("customer_name")}
            error={!!errors.customer_name}
            helperText={errors.customer_name?.message}
          />
          <TextField
            label="Mobile Number"
            fullWidth
            margin="normal"
            {...register("mobile")}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
          <TextField
            label="Repair Issue"
            fullWidth
            margin="normal"
            {...register("repair_issue")}
            error={!!errors.repair_issue}
            helperText={errors.repair_issue?.message}
          />
          <TextField
            label="Note"
            fullWidth
            margin="normal"
            {...register("note")}
            error={!!errors.note}
            helperText={errors.note?.message}
          />
          <TextField
            label="Cost"
            type="number"
            fullWidth
            margin="normal"
            {...register("cost", { valueAsNumber: true })}
            error={!!errors.cost}
            helperText={errors.cost?.message}
          />
          <TextField
            label="Total Price"
            type="number"
            fullWidth
            margin="normal"
            {...register("total_price", { valueAsNumber: true })}
            error={!!errors.total_price}
            helperText={errors.total_price?.message}
          />
          <TextField
            label="Payment Amount"
            type="number"
            fullWidth
            margin="normal"
            {...register("payment_amount", { valueAsNumber: true })}
            error={!!errors.payment_amount}
            helperText={errors.payment_amount?.message}
          />

          {/* Hidden input for status (defaults to pending) */}
          <input type="hidden" {...register("status")} />

          <Box sx={{ mt: 2 }}>
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {isLoading ? "Creating..." : "Create Repair Order"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
