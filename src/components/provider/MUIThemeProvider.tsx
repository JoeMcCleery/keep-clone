"use client";

import { useGlobalStore } from "@/store";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { ReactNode, useMemo } from "react";

// Get custom theme colours
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
        }
      : {
          // palette values for dark mode
        }),
  },
});

export default function MUIThemeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const mode = useGlobalStore((state) => state.colourMode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
