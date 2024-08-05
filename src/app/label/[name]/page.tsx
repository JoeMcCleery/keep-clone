"use client";

import AddNoteBar from "@/components/input/AddNoteBar";
import useLabels from "@/hooks/useLabels";
import { Box, Typography } from "@mui/material";

interface ILabelPageProps {
  params: {
    name: string;
  };
}

export default function LabelPage({ params }: ILabelPageProps) {
  const labels = useLabels();

  return (
    <Box sx={{ p: 3 }}>
      <AddNoteBar />
      <Typography>Hello Label: {params.name}</Typography>
    </Box>
  );
}
