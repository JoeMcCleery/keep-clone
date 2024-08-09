"use client";

import useLabels from "@/hooks/useLabels";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  List,
} from "@mui/material";
import AddLabelForm from "../form/AddLabelForm";
import EditLabelForm from "../form/EditLabelForm";
import { useGlobalStore } from "@/store";
import { useShallow } from "zustand/react/shallow";

export default function EditLabelsModal() {
  const { modalOpen, toggleModalOpen } = useGlobalStore(
    useShallow((state) => ({
      modalOpen: state.editLabelsModalOpen,
      toggleModalOpen: state.toggleEditLabelsModalOpen,
    }))
  );
  const { labels } = useLabels();

  return (
    <Dialog
      open={modalOpen}
      onClose={toggleModalOpen}
    >
      <DialogTitle>Edit labels</DialogTitle>
      <List>
        <AddLabelForm />
        {labels.map((label) => (
          <EditLabelForm
            key={label.id}
            label={label}
          />
        ))}
      </List>
      <Divider />
      <DialogActions>
        <Button onClick={toggleModalOpen}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
