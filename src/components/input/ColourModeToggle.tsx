import { IconButton, useTheme } from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import useColourMode from "@/hooks/useColourMode";

export default function ColourModeToggle() {
  const theme = useTheme();
  const colorMode = useColourMode();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
