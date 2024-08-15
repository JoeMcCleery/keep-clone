"use client";

import { generateNoteId } from "@/rxdb";
import { Note } from "@/rxdb/types/generated/note";
import { NoteBackground, NoteContentItem, NoteType } from "@/rxdb/types/note";
import {
  Box,
  Button,
  ClickAwayListener,
  Input,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
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
  onSubmit?: () => void;
}

export default function NoteForm({
  defaults,
  defaultFocus = false,
  onSubmit,
}: INoteFormProps) {
  const noteCollection = useRxCollection("notes");
  const [focus, setFocus] = useState(defaultFocus);
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

  const noContent = title === "" && !content.some((item) => item.text !== "");

  function onClickSubmitButton() {
    submitAction();
    if (onSubmit) onSubmit();
  }

  function onClickAway() {
    // Create new note if possible
    if (!note) submitAction();
    // Not focused
    setFocus(false);
  }

  async function submitAction() {
    if (!focus) return;

    // Cannot have no title and no content
    if (noContent) {
      return;
    }

    // Create new note data
    const noteData: Note = {
      id,
      type,
      title,
      content,
      background,
      labels,
      pinned,
      archived,
    };

    // Path or create note
    if (note) {
      await note.incrementalPatch(noteData);
    } else {
      await noteCollection?.insert(noteData);
    }
  }

  const { updatedAtString, createdAtString } = useMemo(() => {
    const updatedAtDate = new Date(note?.updatedAt!);
    const currentDateString = new Date().toLocaleDateString();
    const updatedAtDateString = updatedAtDate.toLocaleDateString();
    const createdAtString = new Date(note?.createdAt!).toLocaleDateString(
      "default",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
    const updatedAtString =
      currentDateString === updatedAtDateString
        ? updatedAtDate.toLocaleTimeString("default", {
            hour: "numeric",
            minute: "2-digit",
          })
        : updatedAtDate.toLocaleDateString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
    return { updatedAtString, createdAtString };
  }, [note]);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        onMouseDown={() => {
          setFocus(true);
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
              autofocus={focus}
              content={content}
              onChange={setContent}
            />
          ) : (
            <NoteTodoContent
              autofocus={focus}
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
            alignItems="center"
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
              note={note}
              labels={labels}
              type={type}
              onChangeType={setType}
              onChangeLabels={setLabels}
            />
            {note ? (
              focus && (
                <Tooltip
                  title={`Created ${createdAtString}`}
                  disableInteractive
                >
                  <Typography
                    variant="caption"
                    sx={{ ml: "auto", mr: 2 }}
                  >
                    Edited {updatedAtString}
                  </Typography>
                </Tooltip>
              )
            ) : (
              <Button
                color="inherit"
                disabled={noContent}
                onClick={onClickSubmitButton}
                sx={{ ml: "auto" }}
              >
                Create
              </Button>
            )}
          </Box>
        </NoteContainer>
      </Box>
    </ClickAwayListener>
  );
}
