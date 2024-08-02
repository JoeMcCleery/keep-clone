import { IconButton } from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { useGlobalStore } from "@/store";
import { useShallow } from "zustand/react/shallow";

export default function ColourModeToggle() {
  const { mode, toggleMode } = useGlobalStore(
    useShallow((state) => ({
      mode: state.colourMode,
      toggleMode: state.toggleColourMode,
    }))
  );

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={toggleMode}
      color="inherit"
      title="Toggle colour mode"
    >
      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
