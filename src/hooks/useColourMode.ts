import { ColorModeContext } from "@/components/provider/MUIThemeProvider";
import { useContext } from "react";

export default function useColourMode() {
  return useContext(ColorModeContext);
}
