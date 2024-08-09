"use client";

import useNotes from "@/hooks/useNotes";
import { CircularProgress, Container, Typography } from "@mui/material";
import NotesMasonry from "./NotesMasonry";

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
    <Container
      disableGutters
      maxWidth="xl"
    >
      {hasPinned && (
        <>
          <Typography
            variant="overline"
            color="grey"
          >
            Pinned
          </Typography>
          <NotesMasonry notes={pinned} />
        </>
      )}

      {hasPinned && hasOther && (
        <Typography
          variant="overline"
          color="grey"
        >
          Others
        </Typography>
      )}
      <NotesMasonry notes={other} />
    </Container>
  );
}
