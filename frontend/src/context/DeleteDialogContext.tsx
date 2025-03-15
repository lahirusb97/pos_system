// DeleteDialogContext.tsx
import React, { createContext, useContext, useState } from "react";

interface DeleteDialogState {
  open: boolean;
  itemName?: string;
  deleteFunction?: () => Promise<void>; // Accepts a function
}

interface DeleteDialogContextType {
  state: DeleteDialogState;
  openDialog: (itemName: string, deleteFunction: () => Promise<void>) => void;
  closeDialog: () => void;
}

const DeleteDialogContext = createContext<DeleteDialogContextType | undefined>(
  undefined
);

export const DeleteDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<DeleteDialogState>({ open: false });

  const openDialog = (
    itemName: string,
    deleteFunction: () => Promise<void>
  ) => {
    setState({ open: true, itemName, deleteFunction });
  };

  const closeDialog = () => {
    setState({ open: false });
  };

  return (
    <DeleteDialogContext.Provider value={{ state, openDialog, closeDialog }}>
      {children}
    </DeleteDialogContext.Provider>
  );
};

export const useDeleteDialog = () => {
  const context = useContext(DeleteDialogContext);
  if (!context) {
    throw new Error(
      "useDeleteDialog must be used within a DeleteDialogProvider"
    );
  }
  return context;
};
