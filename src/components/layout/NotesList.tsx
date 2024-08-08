"use client";

import useNotes from "@/hooks/useNotes";
import { Box, CircularProgress, Typography } from "@mui/material";
import NoteForm from "../form/NoteForm";
import { Masonry } from "@mui/lab";

interface INotesListProps {
  archived?: boolean;
  labels?: string[];
}

export default function NotesList({
  archived = false,
  labels = [],
}: INotesListProps) {
  const { notes: pinned, isFetching: fetchingPinned } = useNotes(
    archived,
    true,
    labels
  );
  const { notes: other, isFetching: fetchingOther } = useNotes(
    archived,
    false,
    labels
  );

  if (fetchingPinned || fetchingOther) {
    return <CircularProgress />;
  }

  const hasPinned = pinned.length > 0;
  const hasOther = other.length > 0;

  return (
    <>
      {hasPinned && (
        <Box width="100%">
          <Typography variant="overline">Pinned</Typography>
          <Masonry
            spacing={2}
            sequential
          >
            {pinned.map((n) => (
              <NoteForm
                key={n.id}
                defaults={n}
              />
            ))}
          </Masonry>
        </Box>
      )}

      <Box width="100%">
        {hasPinned && hasOther && (
          <Typography variant="overline">Others</Typography>
        )}
        <Masonry
          spacing={2}
          sequential
        >
          {other.map((n) => (
            <NoteForm
              key={n.id}
              defaults={n}
            />
          ))}
        </Masonry>
      </Box>
    </>
  );
}
