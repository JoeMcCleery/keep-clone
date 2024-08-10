"use client";

import { generateNoteId } from "@/rxdb";
import { Note } from "@/rxdb/types/generated/note";
import { NoteBackground, NoteContentItem, NoteType } from "@/rxdb/types/note";
import { Box, ClickAwayListener, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRxCollection } from "rxdb-hooks";
import NoteBackgroundOptions from "@/components/input/NoteBackgroundOptions";
import NoteContainer from "@/components/note/NoteContainer";
import LabelArray from "@/components/note/LabelArray";
import ArchivedToggle from "@/components/input/ArchivedToggle";
import PinnedToggle from "@/components/input/PinnedToggle";
import NoteOptions from "@/components/input/NoteOptions";
import NoteTodoContent from "@/components/note/NoteTodoContent";
import NoteSimpleContent from "../note/NoteSimpleContent";
import { isRxDocument, RxDocument } from "rxdb";

interface INoteFormProps {
  defaults?: Partial<Note> | RxDocument<Note>;
  defaultFocus?: boolean;
}

export default function NoteForm({
  defaults,
  defaultFocus = false,
}: INoteFormProps) {
  const noteCollection = useRxCollection("notes");
  const focus = useRef(defaultFocus);
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

  const note = isRxDocument(defaults) ? (defaults as RxDocument<Note>) : null;

  useEffect(() => {
    if (!note) return;
    submitAction();
  }, [id, type, title, content, background, labels, pinned, archived]);

  function onClickAway() {
    submitAction();
    focus.current = false;
  }

  async function submitAction() {
    if (!focus.current) return;

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

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        onMouseDown={() => {
          focus.current = true;
        }}
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

          {type === "simple" ? (
            <NoteSimpleContent
              autofocus={focus.current}
              content={content}
              onChange={setContent}
            />
          ) : (
            <NoteTodoContent
              autofocus={focus.current}
              content={content}
              onChange={setContent}
            />
          )}

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
            {note && (
              <NoteOptions
                note={note}
                onChangeType={setType}
                onChangeLabels={setLabels}
              />
            )}
          </Box>
        </NoteContainer>
      </Box>
    </ClickAwayListener>
  );
}
