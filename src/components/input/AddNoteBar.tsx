"use client";

import {
  Box,
  ClickAwayListener,
  Container,
  IconButton,
  Input,
  Tooltip,
} from "@mui/material";
import NoteForm from "../form/NoteForm";
import { useState } from "react";
import { CheckBoxOutlined } from "@mui/icons-material";
import { Note } from "@/rxdb/types/generated/note";
import NoteContainer from "@/components/note/NoteContainer";

interface IAddNoteBarProps {
  labelId?: string;
}

function getDefaults(labelId?: string) {
  return {
    ...(labelId ? { labels: [labelId] } : {}),
  };
}

export default function AddNoteBar({ labelId }: IAddNoteBarProps) {
  const [focused, setFocused] = useState(false);
  const [defaults, setDefaults] = useState<Partial<Note>>(getDefaults(labelId));

  function reset() {
    if (!focused) return;
    setTimeout(() => {
      setDefaults(getDefaults(labelId));
      setFocused(false);
    });
  }

  function newList() {
    setDefaults({ ...defaults, type: "todo" });
    setFocused(true);
  }

  return (
    <Container
      maxWidth="sm"
      disableGutters
    >
      <ClickAwayListener onClickAway={reset}>
        <Box>
          {focused ? (
            <NoteForm
              defaults={defaults}
              defaultFocus
              onSubmitButton={reset}
            />
          ) : (
            <NoteContainer>
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
            </NoteContainer>
          )}
        </Box>
      </ClickAwayListener>
    </Container>
  );
}
