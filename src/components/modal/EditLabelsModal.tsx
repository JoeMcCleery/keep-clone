"use client";

import useEditLabelsModalOpen from "@/hooks/useEditLabelsModalOpen";
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

export default function EditLabelsModal() {
  const { modalOpen, toggleModalOpen } = useEditLabelsModalOpen();
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
        <Button onClick={toggleModalOpen}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}
