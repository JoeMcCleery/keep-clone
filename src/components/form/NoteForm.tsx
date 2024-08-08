"use client";

import { generateNoteId } from "@/rxdb";
import { Note } from "@/rxdb/types/generated/note";
import { NoteBackground, NoteContentItem, NoteType } from "@/rxdb/types/note";
import { PushPin, PushPinOutlined } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  ClickAwayListener,
  IconButton,
  Input,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useRxCollection } from "rxdb-hooks";
import NoteBackgroundOptions from "@/components/input/NoteBackgroundOptions";
import NoteContainer from "@/components/container/NoteContainer";

interface INoteFormProps {
  defaults?: Partial<Note>;
}

export default function NoteForm({ defaults }: INoteFormProps) {
  const noteCollection = useRxCollection("notes");
  // Note data
  const [id] = useState(defaults?.id ?? generateNoteId());
  const [type, setType] = useState<NoteType>(defaults?.type ?? "simple");
  const [title, setTitle] = useState(defaults?.title ?? "");
  const [content, setContent] = useState<NoteContentItem[]>(
    defaults?.content ?? [{ text: "", completed: false }]
  );
  const [background, setBackground] = useState<NoteBackground>(
    defaults?.background ?? "default"
  );
  const [labels, setLabels] = useState<string[]>(defaults?.labels ?? []);
  const [pinned, setPinned] = useState(defaults?.pinned ?? false);
  const [archived, setArchived] = useState(defaults?.archived ?? false);

  function updateContent(index: number, item: NoteContentItem) {
    content[index] = item;
    setContent([...content]);
  }

  function submitAction() {
    // Cannot have no title and no content
    if (title === "" && !content.some((item) => item.text !== "")) {
      return;
    }

    // Create or update note
    noteCollection?.incrementalUpsert({
      id,
      type,
      title,
      content,
      background,
      labels,
      pinned,
      archived,
    });
  }

  function simpleContentView() {
    let text = content.map((item) => item.text).join("\n");
    return (
      <Input
        autoFocus
        placeholder="Take a note..."
        onChange={(e) =>
          updateContent(0, { ...content[0], text: e.target.value })
        }
        value={text}
        fullWidth
        disableUnderline
        multiline
        sx={{ px: 2, py: 1, fontSize: "0.9em" }}
      />
    );
  }

  function todoContentView() {
    return content.map((item, idx) => (
      <Box
        key={idx}
        display="flex"
        sx={{ pl: 1, alignItems: "start" }}
      >
        <Checkbox
          color="default"
          checked={item.completed}
          onChange={(e) =>
            updateContent(idx, { ...item, completed: e.target.checked })
          }
        />
        <Input
          autoFocus
          placeholder=""
          onChange={(e) =>
            updateContent(0, { text: e.target.value, completed: false })
          }
          value={item.text}
          fullWidth
          disableUnderline
          multiline
          sx={{ py: 1.5, fontSize: "0.9em" }}
        />
      </Box>
    ));
  }

  return (
    <ClickAwayListener onClickAway={submitAction}>
      <Box
        component="form"
        action={submitAction}
      >
        <NoteContainer background={background}>
          <Box display="flex">
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              fullWidth
              disableUnderline
              sx={{ px: 2, py: 1, fontWeight: "bold" }}
            />
            <Tooltip
              title={pinned ? "Unpin note" : "Pin note"}
              disableInteractive
            >
              <IconButton
                size="large"
                onClick={() => setPinned((isPinned) => !isPinned)}
              >
                {pinned ? <PushPin /> : <PushPinOutlined />}
              </IconButton>
            </Tooltip>
          </Box>
          {type === "simple" ? simpleContentView() : todoContentView()}
          <Box
            display="flex"
            p={1}
          >
            <NoteBackgroundOptions
              background={background}
              onChange={setBackground}
            />
          </Box>
        </NoteContainer>
      </Box>
    </ClickAwayListener>
  );
}
