"use client";

import { MenuItem } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import ChangeNoteLabelsModal from "../modal/ChangeNoteLabelsModal";

interface IChangeNoteLabelsProps {
  labels: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
}

export default function ChangeNoteLabels({
  labels,
  onChange,
}: IChangeNoteLabelsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuItem onClick={() => setOpen(true)}>
        {labels.length > 0 ? "Change labels" : "Add label"}
      </MenuItem>
      <ChangeNoteLabelsModal
        modalOpen={open}
        noteLabels={labels}
        onChange={onChange}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
