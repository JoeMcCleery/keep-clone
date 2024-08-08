import { NoteBackground } from "@/rxdb/types/note";
import { Paper, SxProps, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface INoteContainerProps {
  background?: NoteBackground;
  children: ReactNode;
}

export default function NoteContainer({
  background = "default",
  children,
}: INoteContainerProps) {
  const theme = useTheme();

  function containerStyles(): SxProps {
    return background === "default"
      ? {
          outline: 1,
          outlineColor: theme.palette.divider,
          background: "none",
        }
      : {
          backgroundColor: theme.palette[background].main,
        };
  }

  return (
    <Paper
      elevation={4}
      sx={containerStyles()}
    >
      {children}
    </Paper>
  );
}
