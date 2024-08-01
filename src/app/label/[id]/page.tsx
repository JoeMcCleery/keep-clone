import { Box, Typography } from "@mui/material";

interface ILabelPageProps {
  params: {
    id: string;
  };
}

export default function LabelPage({ params }: ILabelPageProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography>Hello Label: {params.id}</Typography>
    </Box>
  );
}
