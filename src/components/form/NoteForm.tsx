"use client";

import { generateNoteId } from "@/rxdb";
import { Note } from "@/rxdb/types/generated/note";
import { NoteBackground, NoteContentItem, NoteType } from "@/rxdb/types/note";
import {
  Box,
  Checkbox,
  ClickAwayListener,
  Divider,
  Input,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useRxCollection } from "rxdb-hooks";
import NoteBackgroundOptions from "@/components/input/NoteBackgroundOptions";
import NoteContainer from "@/components/note/NoteContainer";
import LabelArray from "@/components/note/LabelArray";
import ArchivedToggle from "@/components/input/ArchivedToggle";
import PinnedToggle from "@/components/input/PinnedToggle";
import NoteOptions from "@/components/input/NoteOptions";

interface INoteFormProps {
  defaults?: Partial<Note>;
}

export default function NoteForm({ defaults }: INoteFormProps) {
  const theme = useTheme();
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
    const newContent = [...content];
    newContent[index] = item;
    setContent(newContent);
  }

  async function submitAction() {
    // Cannot have no title and no content
    if (title === "" && !content.some((item) => item.text !== "")) {
      return;
    }

    // Create or update note
    await noteCollection?.incrementalUpsert({
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
    const completed = content.filter((c) => c.completed);
    const uncompleted = content.filter((c) => !c.completed);
    return (
      <>
        {uncompleted.map((item, idx) => (
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
                updateContent(idx, { ...item, text: e.target.value })
              }
              value={item.text}
              fullWidth
              disableUnderline
              multiline
              sx={{ py: 1.5, fontSize: "0.9em" }}
            />
          </Box>
        ))}
        {completed.length > 0 && uncompleted.length > 0 && (
          <Divider sx={{ mx: 2 }} />
        )}
        {completed.map((item, idx) => (
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
                updateContent(idx, { ...item, text: e.target.value })
              }
              value={item.text}
              fullWidth
              disableUnderline
              multiline
              sx={{
                py: 1.5,
                fontSize: "0.9em",
                textDecoration: "line-through",
                textDecorationColor: theme.palette.text.disabled,
              }}
              inputProps={{
                style: { color: theme.palette.text.disabled },
              }}
            />
          </Box>
        ))}
      </>
    );
  }

  return (
    <ClickAwayListener onClickAway={submitAction}>
      <Box
        component="form"
        action={submitAction}
      >
        <NoteContainer background={background}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            pr={1}
          >
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              fullWidth
              disableUnderline
              sx={{ px: 2, py: 1, fontWeight: "bold" }}
            />
            <PinnedToggle
              pinned={pinned}
              onChange={setPinned}
            />
          </Box>

          {type === "simple" ? simpleContentView() : todoContentView()}

          {labels.length > 0 && (
            <LabelArray
              noteLabels={labels}
              onChange={setLabels}
            />
          )}

          <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            p={1}
          >
            <NoteBackgroundOptions
              background={background}
              onChange={setBackground}
            />
            <ArchivedToggle
              archived={archived}
              onChange={setArchived}
            />
            <NoteOptions
              type={type}
              labels={labels}
              onChangeType={setType}
              onChangeLabels={setLabels}
            />
          </Box>
        </NoteContainer>
      </Box>
    </ClickAwayListener>
  );
}
