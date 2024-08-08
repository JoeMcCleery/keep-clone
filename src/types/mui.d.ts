import type {
  PaletteOptions,
  Palette,
  PaletteColor,
  PaletteColorOptions,
  ButtonPropsColorOverrides,
} from "@mui/material";

// Custom palette colours
declare module "@mui/material/styles" {
  interface Palette {
    coral: PaletteColor;
    peach: PaletteColor;
    sand: PaletteColor;
    mint: PaletteColor;
    sage: PaletteColor;
    fog: PaletteColor;
    storm: PaletteColor;
    dusk: PaletteColor;
    blossom: PaletteColor;
    clay: PaletteColor;
    chalk: PaletteColor;
  }

  interface PaletteOptions {
    coral?: PaletteColorOptions;
    peach?: PaletteColorOptions;
    sand?: PaletteColorOptions;
    mint?: PaletteColorOptions;
    sage?: PaletteColorOptions;
    fog?: PaletteColorOptions;
    storm?: PaletteColorOptions;
    dusk?: PaletteColorOptions;
    blossom?: PaletteColorOptions;
    clay?: PaletteColorOptions;
    chalk?: PaletteColorOptions;
  }
}

// Custom button colours
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    coral: true;
    peach: true;
    sand: true;
    mint: true;
    sage: true;
    fog: true;
    storm: true;
    dusk: true;
    blossom: true;
    clay: true;
    chalk: true;
  }
}
