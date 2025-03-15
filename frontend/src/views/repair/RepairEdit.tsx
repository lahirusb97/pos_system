import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import {
  useGetRepairQuery,
  useUpdateRepairMutation,
} from "../../apislice/repairApiSlice";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateAndTimeFormat } from "../../util/dateAndTimeFormat";

// Zod Schema
const repairSchema = z.object({
  repair_issue: z.string().min(1, "Repair issue is required"),
  status: z.enum(["pending", "completed", "canceled"]),
  note: z.string().optional(),
  cost: z.number().min(0, "Cost cannot be negative"),
  total_price: z.number().min(0, "Total price cannot be negative"),
});

// Form Type

type RepairFormValues = z.infer<typeof repairSchema>;

export default function RepairEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: repair, error, isLoading } = useGetRepairQuery(Number(id));
  const [updateRepair, { isLoading: isUpdating }] = useUpdateRepairMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RepairFormValues>({
    resolver: zodResolver(repairSchema),
    defaultValues: {
      repair_issue: "",
      status: "pending",
      note: "",
      cost: 0,
      total_price: 0,
    },
  });

  // Automatically populate form fields when repair data is available
  useEffect(() => {
    if (repair) {
      setValue("repair_issue", repair.repair_issue);
      setValue("status", repair.status);
      setValue("note", repair.note);
      setValue("cost", repair.cost);
      setValue("total_price", repair.total_price);
    }
  }, [repair, setValue]);

  // Handle Form Submission
  const onSubmit = async (data: RepairFormValues) => {
    try {
      await updateRepair({ id: Number(id), ...data }).unwrap();

      navigate(-1); // Redirect after update
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  console.log(repair);

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading repair details.</p>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ padding: 3, width: 400 }}>
        <h2>Edit Repair</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>
            <strong>Customer Name:</strong> {repair?.customer.name}
          </Typography>
          <Typography>
            <strong>Mobile:</strong> {repair?.customer.mobile}
          </Typography>
          <Typography>
            <strong>Date:</strong> {dateAndTimeFormat(repair?.created_at)}
          </Typography>

          <TextField
            label="Repair Issue"
            {...register("repair_issue")}
            fullWidth
            margin="normal"
            error={!!errors.repair_issue}
            helperText={errors.repair_issue?.message}
          />
          <TextField
            label="Note"
            {...register("note")}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            error={!!errors.note}
            helperText={errors.note?.message}
          />
          <TextField
            label="Cost"
            type="number"
            {...register("cost", { valueAsNumber: true })}
            fullWidth
            margin="normal"
            error={!!errors.cost}
            helperText={errors.cost?.message}
          />
          <TextField
            label="Total Price"
            type="number"
            {...register("total_price", { valueAsNumber: true })}
            fullWidth
            margin="normal"
            error={!!errors.total_price}
            helperText={errors.total_price?.message}
          />

          {/* Status Radio Buttons */}
          <FormControl
            component="fieldset"
            sx={{ mt: 2 }}
            error={!!errors.status}
          >
            <FormLabel>Reparing Status</FormLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="completed"
                    control={<Radio />}
                    label="Completed"
                  />
                  <FormControlLabel
                    value="canceled"
                    control={<Radio />}
                    label="Canceled"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Repair"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
