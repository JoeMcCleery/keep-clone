"use client";

import { NoteType } from "@/rxdb/types/note";
import { MoreVert } from "@mui/icons-material";
import { Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import ChangeNoteLabels from "./ChangeNoteLabels";

interface INoteOptionsProps {
  type: NoteType;
  labels: string[];
  onChangeType: Dispatch<SetStateAction<NoteType>>;
  onChangeLabels: Dispatch<SetStateAction<string[]>>;
}

export default function NoteOptions({
  type,
  labels,
  onChangeType,
  onChangeLabels,
}: INoteOptionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function toggleType() {
    onChangeType((t) => (t === "simple" ? "todo" : "simple"));
  }

  return (
    <>
      <Tooltip
        title="More"
        disableInteractive
      >
        <IconButton onClick={handleClick}>
          <MoreVert fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <ChangeNoteLabels
          labels={labels}
          onChange={onChangeLabels}
        />
        <MenuItem onClick={toggleType}>
          {type === "simple" ? "Show" : "Hide"} tick boxes
        </MenuItem>
      </Menu>
    </>
  );
}
