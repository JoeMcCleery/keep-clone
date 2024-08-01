import { IconButton } from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import useColourMode from "@/hooks/useColourMode";

export default function ColourModeToggle() {
  const { colourMode, toggleColourMode } = useColourMode();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={toggleColourMode}
      color="inherit"
      title="Toggle colour mode"
    >
      {colourMode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
