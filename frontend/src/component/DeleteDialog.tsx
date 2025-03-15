import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useDeleteDialog } from "../context/DeleteDialogContext";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../util/extractErrorMessage";

const DeleteDialog: React.FC = () => {
  const { state, closeDialog } = useDeleteDialog();

  const handleDelete = async () => {
    try {
      await state.deleteFunction?.();
      toast.success(`${state.itemName} deleted successfully`);
      closeDialog();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Dialog open={state.open} onClose={closeDialog} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete {state.itemName || "this item"}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary" variant="outlined">
          No
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
