import AddNoteBar from "@/components/input/AddNoteBar";
import { Box, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ p: 3 }}>
      <AddNoteBar />
      <Typography>Hello Notes</Typography>
    </Box>
  );
}
