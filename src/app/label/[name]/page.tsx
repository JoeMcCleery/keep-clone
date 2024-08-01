import { Box, Typography } from "@mui/material";

interface ILabelPageProps {
  params: {
    name: string;
  };
}

export default function LabelPage({ params }: ILabelPageProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography>Hello Label: {params.name}</Typography>
    </Box>
  );
}
