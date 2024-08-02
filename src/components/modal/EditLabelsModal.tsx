"use client";

import useLabels from "@/hooks/useLabels";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
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
  const labels = useLabels();

  return (
    <Dialog
      open={modalOpen}
      onClose={toggleModalOpen}
    >
      <DialogTitle>Edit labels</DialogTitle>
      <DialogContent>
        <List disablePadding>
          <ListItem disableGutters>
            <AddLabelForm />
          </ListItem>
          {labels.map((label) => (
            <ListItem
              disableGutters
              key={label.name}
            >
              <EditLabelForm label={label} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={toggleModalOpen}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
