"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface IConfirmDeleteNoteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function ConfirmDeleteNoteModal({
  open,
  onClose,
  onDelete,
}: IConfirmDeleteNoteModalProps) {
  function onConfirmDelete() {
    onClose();
    onDelete();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        <DialogContentText>Delete note forever?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button onClick={onConfirmDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
