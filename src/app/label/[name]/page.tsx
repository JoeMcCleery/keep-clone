"use client";

import AddNoteBar from "@/components/input/AddNoteBar";
import useLabels from "@/hooks/useLabels";
import { Box, CircularProgress, Typography } from "@mui/material";

interface ILabelPageProps {
  params: {
    name: string;
  };
}

export default function LabelPage({ params }: ILabelPageProps) {
  const { labels, isFetching } = useLabels();
  const label = labels.find((label) => label.name === params.name);

  return (
    <Box sx={{ p: 3 }}>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <AddNoteBar labelId={label?.id} />
          <Typography>Hello Label: {params.name}</Typography>
        </>
      )}
    </Box>
  );
}
