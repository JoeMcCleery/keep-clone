"use client";

import { Note } from "@/rxdb/types/generated/note";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { RxDocument } from "rxdb";
import ConfirmDeleteNoteModal from "@/components/modal/ConfirmDeleteNoteModal";

interface IDeleteNoteOptionProps {
  note: RxDocument<Note>;
}

export default function DeleteNoteOption({ note }: IDeleteNoteOptionProps) {
  const [open, setOpen] = useState(false);

  async function deleteNote() {
    await note.incrementalRemove();
  }

  return (
    <>
      <MenuItem onClick={() => setOpen(true)}>Delete note</MenuItem>
      <ConfirmDeleteNoteModal
        open={open}
        onClose={() => setOpen(false)}
        onDelete={deleteNote}
      />
    </>
  );
}
