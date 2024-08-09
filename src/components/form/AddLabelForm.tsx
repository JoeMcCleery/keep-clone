"use client";

import { generateLabelId } from "@/rxdb";
import { Label } from "@/rxdb/types/generated/label";
import { Add, Done } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  TextField,
  Tooltip,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useRxCollection } from "rxdb-hooks";

export default function AddLabelForm() {
  const labelCollection = useRxCollection<Label>("labels");
  const [name, setName] = useState("");
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

    // Cannot have labels with same name
    const existing = await labelCollection
      ?.findOne({
        selector: {
          name,
        },
      })
      .exec();
    if (existing) {
      setError("Label already exists.");
      return;
    }

    // Create new label
    await labelCollection?.incrementalUpsert({
      id: generateLabelId(name),
      name,
    });

    // Reset form input
    setError("");
    setName("");
  }

  return (
    <ListItem
      component="form"
      autoComplete="off"
      action={submitAction}
      secondaryAction={
        <Tooltip
          title="Create label"
          disableInteractive
        >
          <IconButton
            size="small"
            type="submit"
            edge="end"
          >
            <Done fontSize="inherit" />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemIcon>
        <Add
          color="disabled"
          fontSize="small"
        />
      </ListItemIcon>
      <TextField
        variant="standard"
        placeholder="New label name"
        value={name}
        onChange={onChange}
        error={error !== ""}
        helperText={error}
        fullWidth
      />
    </ListItem>
  );
}
