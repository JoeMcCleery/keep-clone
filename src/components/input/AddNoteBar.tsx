"use client";

import {
  Box,
  ClickAwayListener,
  IconButton,
  Input,
  Paper,
  Tooltip,
  useTheme,
} from "@mui/material";
import NoteForm from "../form/NoteForm";
import { useState } from "react";
import { CheckBoxOutlined } from "@mui/icons-material";
import { Note } from "@/rxdb/types/generated/note";

export default function AddNoteBar() {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [defaults, setDefaults] = useState<Partial<Note>>({});

  function reset() {
    setDefaults({});
    setFocused(false);
  }

  function newList() {
    setDefaults({ ...defaults, type: "todo" });
    setFocused(true);
  }

  return (
    <ClickAwayListener onClickAway={reset}>
      <Paper
        elevation={4}
        sx={{
          outline: 1,
          outlineColor: theme.palette.divider,
        }}
      >
        {focused ? (
          <NoteForm defaults={defaults} />
        ) : (
          <Box display="flex">
            <Input
              placeholder="Take a note..."
              disableUnderline
              fullWidth
              sx={{ pl: 2, py: 1, fontWeight: "bold" }}
              onFocus={() => setFocused(true)}
            />
            <Tooltip
              title="New list"
              disableInteractive
            >
              <IconButton
                size="large"
                onClick={() => newList()}
              >
                <CheckBoxOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Paper>
    </ClickAwayListener>
  );
}
