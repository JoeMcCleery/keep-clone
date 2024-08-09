"use client";

import useLabels from "@/hooks/useLabels";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddLabelForm from "../form/AddLabelForm";
import { Dispatch, SetStateAction } from "react";
import { CheckBox, CheckBoxOutlineBlankOutlined } from "@mui/icons-material";

interface IChangeNoteLabelsModal {
  modalOpen: boolean;
  noteLabels: string[];
  onClose: () => void;
  onChange: Dispatch<SetStateAction<string[]>>;
}

export default function ChangeNoteLabelsModal({
  modalOpen,
  noteLabels,
  onClose,
  onChange,
}: IChangeNoteLabelsModal) {
  const { labels, isFetching } = useLabels();

  function setNoteLabel(labelId: string, selected: boolean) {
    if (selected) {
      onChange((ids) => [...ids, labelId]);
    } else {
      onChange((ids) => ids.filter((id) => id != labelId));
    }
  }

  return (
    <Dialog
      open={modalOpen}
      onClose={onClose}
    >
      <DialogTitle>Edit note labels</DialogTitle>
      <List disablePadding>
        <AddLabelForm />
        {isFetching ? (
          <CircularProgress />
        ) : (
          labels.map((label) => {
            const selected = noteLabels.includes(label.id);

            return (
              <ListItem
                key={label.name}
                disablePadding
              >
                <ListItemButton
                  onClick={() => setNoteLabel(label.id, !selected)}
                  dense
                >
                  <ListItemIcon>
                    {selected ? (
                      <CheckBox fontSize="small" />
                    ) : (
                      <CheckBoxOutlineBlankOutlined fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={label.name} />
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>
      <Divider />
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
