"use client";

import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import React, { createContext, useMemo } from "react";

interface IColourModeContext {
  colourMode: PaletteMode;
  toggleColourMode: () => void;
}

export const ColorModeContext = createContext<IColourModeContext>({
  colourMode: "dark",
  toggleColourMode: () => {},
});

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
  children: React.ReactNode;
}>) {
  const [mode, setMode] = React.useState<PaletteMode>("dark");

  const colourModeContext = useMemo(
    () => ({
      colourMode: mode,
      toggleColourMode: () => {
        setMode((prevMode) => (prevMode == "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colourModeContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
