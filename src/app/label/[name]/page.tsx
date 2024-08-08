"use client";

import AddNoteBar from "@/components/input/AddNoteBar";
import NotesList from "@/components/layout/NotesList";
import useLabels from "@/hooks/useLabels";
import { CircularProgress, Typography } from "@mui/material";

interface ILabelPageProps {
  params: {
    name: string;
  };
}

export default function LabelPage({ params }: ILabelPageProps) {
  const name = decodeURI(params.name);
  const { labels, isFetching } = useLabels();
  const label = labels.find((label) => label.name === name);

  return (
    <>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <AddNoteBar labelId={label?.id} />
          <NotesList labels={label ? [label.id] : undefined} />
        </>
      )}
    </>
  );
}
