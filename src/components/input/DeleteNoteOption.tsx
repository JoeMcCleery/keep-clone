"use client";

import { Note } from "@/rxdb/types/generated/note";
import { MenuItem } from "@mui/material";
import { RxDocument } from "rxdb";

interface IDeleteNoteOptionProps {
  note: RxDocument<Note>;
}

export default function DeleteNoteOption({ note }: IDeleteNoteOptionProps) {
  async function deleteNote() {
    await note.incrementalRemove();
  }

  return <MenuItem onClick={deleteNote}>Delete note</MenuItem>;
}
