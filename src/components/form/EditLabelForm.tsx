"use client";

import { Label } from "@/rxdb/types/generated/label";
import { Delete, Edit, Label as LabelIcon } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
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
          <Tooltip
            title="Remove label"
            disableInteractive
          >
            <IconButton
              size="small"
              onClick={remove}
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            size="small"
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
        <Tooltip
          title="Update label"
          disableInteractive
        >
          <IconButton
            size="small"
            type="submit"
          >
            <Edit fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
