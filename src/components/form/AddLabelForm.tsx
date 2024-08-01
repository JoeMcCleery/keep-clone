"use client";

import { generateLabelId } from "@/rxdb";
import { Label } from "@/rxdb/types/generated/label";
import { Add, Done } from "@mui/icons-material";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useRxCollection } from "rxdb-hooks";

export default function AddLabelForm() {
  const formRef = useRef<HTMLFormElement>();
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
      setError("A name is required.");
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
      setError("Name must be unique.");
      return;
    }

    // Create new label
    await labelCollection?.insert({
      id: generateLabelId(name),
      name,
    });

    // Reset form input
    setError("");
    setName("");
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      action={submitAction}
      ref={formRef}
      sx={{ display: "flex", alignItems: "flex-end" }}
    >
      <Box marginRight={1}>
        <IconButton
          size="small"
          title="Create label"
          disabled
        >
          <Add fontSize="inherit" />
        </IconButton>
      </Box>
      <TextField
        id="label-name"
        name="label-name"
        label="New label name"
        variant="standard"
        value={name}
        onChange={onChange}
        error={error !== ""}
        helperText={error}
      />
      <Box marginLeft={1}>
        <IconButton
          size="small"
          title="Create label"
          type="submit"
        >
          <Done fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}
