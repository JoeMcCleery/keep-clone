"use client";

import { Label } from "@/rxdb/types/generated/label";
import { Delete, Edit, Label as LabelIcon } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  TextField,
  Tooltip,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { RxDocument } from "rxdb";

interface IEditLabelFormProps {
  label: RxDocument<Label>;
}

export default function EditLabelForm({ label }: IEditLabelFormProps) {
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState(label.name);
  const [error, setError] = useState("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setError("");
  }

  async function submitAction() {
    // Cannot have empty name
    if (name === "") {
      setError("Label requires a name.");
      return;
    }

    // Update existing label
    await label.incrementalPatch({
      name,
    });

    // Clear error
    setError("");
  }

  async function remove() {
    await label.remove();
  }

  return (
    <ListItem
      component="form"
      autoComplete="off"
      action={submitAction}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      secondaryAction={
        <Tooltip
          title="Update label"
          disableInteractive
        >
          <IconButton
            size="small"
            type="submit"
            edge="end"
          >
            <Edit fontSize="inherit" />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemIcon>
        {focused ? (
          <Tooltip
            title="Remove label"
            disableInteractive
          >
            <IconButton
              edge="start"
              size="small"
              onClick={remove}
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ) : (
          <LabelIcon
            fontSize="small"
            color="disabled"
          />
        )}
      </ListItemIcon>

      <TextField
        variant="standard"
        placeholder="Label name"
        value={name}
        onFocus={() => setFocused(true)}
        onChange={onChange}
        error={error !== ""}
        helperText={error}
        fullWidth
      />
    </ListItem>
  );
}
