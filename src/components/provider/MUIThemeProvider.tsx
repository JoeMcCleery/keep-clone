"use client";

import { useGlobalStore } from "@/store";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { ReactNode, useMemo } from "react";

// Default theme
const theme = createTheme({});

// Get custom theme colours
const getDesignTokens = (mode: PaletteMode) => ({
  ...theme,
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          coral: theme.palette.augmentColor({
            color: {
              main: "#faafa8",
            },
            name: "coral",
          }),
          peach: theme.palette.augmentColor({
            color: {
              main: "#f39f76",
            },
            name: "peach",
          }),
          sand: theme.palette.augmentColor({
            color: {
              main: "#fff8b8",
            },
            name: "sand",
          }),
          mint: theme.palette.augmentColor({
            color: {
              main: "#e2f6d3",
            },
            name: "mint",
          }),
          sage: theme.palette.augmentColor({
            color: {
              main: "#b4ddd3",
            },
            name: "sage",
          }),
          fog: theme.palette.augmentColor({
            color: {
              main: "#d4e4ed",
            },
            name: "fog",
          }),
          storm: theme.palette.augmentColor({
            color: {
              main: "#aeccdc",
            },
            name: "storm",
          }),
          dusk: theme.palette.augmentColor({
            color: {
              main: "#d3bfdb",
            },
            name: "dusk",
          }),
          blossom: theme.palette.augmentColor({
            color: {
              main: "#f6e2dd",
            },
            name: "blossom",
          }),
          clay: theme.palette.augmentColor({
            color: {
              main: "#e9e3d4",
            },
            name: "clay",
          }),
          chalk: theme.palette.augmentColor({
            color: {
              main: "#efeff1",
            },
            name: "chalk",
          }),
        }
      : {
          // palette values for dark mode
          coral: theme.palette.augmentColor({
            color: {
              main: "#77172e",
            },
            name: "coral",
          }),
          peach: theme.palette.augmentColor({
            color: {
              main: "#692b17",
            },
            name: "peach",
          }),
          sand: theme.palette.augmentColor({
            color: {
              main: "#7c4a03",
            },
            name: "sand",
          }),
          mint: theme.palette.augmentColor({
            color: {
              main: "#264d3b",
            },
            name: "mint",
          }),
          sage: theme.palette.augmentColor({
            color: {
              main: "#0c625d",
            },
            name: "sage",
          }),
          fog: theme.palette.augmentColor({
            color: {
              main: "#256377",
            },
            name: "fog",
          }),
          storm: theme.palette.augmentColor({
            color: {
              main: "#284255",
            },
            name: "storm",
          }),
          dusk: theme.palette.augmentColor({
            color: {
              main: "#472e5b",
            },
            name: "dusk",
          }),
          blossom: theme.palette.augmentColor({
            color: {
              main: "#6c394f",
            },
            name: "blossom",
          }),
          clay: theme.palette.augmentColor({
            color: {
              main: "#4b443a",
            },
            name: "clay",
          }),
          chalk: theme.palette.augmentColor({
            color: {
              main: "#232427",
            },
            name: "chalk",
          }),
        }),
  },
});

export default function MUIThemeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const mode = useGlobalStore((state) => state.colourMode);
  const appTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
