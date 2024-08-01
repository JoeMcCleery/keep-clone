"use client";

import { Label } from "@/rxdb/types/generated/label";
import { Delete, Edit, Label as LabelIcon } from "@mui/icons-material";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
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
      setError("A name is required.");
      return;
    }

    // Update existing label
    await label.patch({
      name,
    });

    // Clear error
    setError("");
  }

  async function remove() {
    await label.remove();
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      action={submitAction}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      sx={{ display: "flex", alignItems: "flex-end" }}
    >
      <Box marginRight={1}>
        {focused ? (
          <IconButton
            size="small"
            title="Remove label"
            onClick={remove}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            title="Edit label"
            disabled
          >
            <LabelIcon fontSize="inherit" />
          </IconButton>
        )}
      </Box>

      <TextField
        id="label-name"
        name="label-name"
        variant="standard"
        value={name}
        onFocus={() => setFocused(true)}
        onChange={onChange}
        error={error !== ""}
        helperText={error}
      />
      <Box marginLeft={1}>
        <IconButton
          size="small"
          title="Update label"
          type="submit"
        >
          <Edit fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}
