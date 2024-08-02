import { PaletteMode } from "@mui/material";
import { create } from "zustand";

interface IGlobalStore {
  colourMode: PaletteMode;
  editLabelsModalOpen: boolean;
  navigationOpen: boolean;

  toggleColourMode: () => void;
  toggleEditLabelsModalOpen: () => void;
  toggleNavigationOpen: () => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  colourMode: "dark",
  editLabelsModalOpen: false,
  navigationOpen: false,

  toggleColourMode: () =>
    set((state) => ({
      colourMode: state.colourMode === "dark" ? "light" : "dark",
    })),

  toggleEditLabelsModalOpen: () =>
    set((state) => ({ editLabelsModalOpen: !state.editLabelsModalOpen })),

  toggleNavigationOpen: () =>
    set((state) => ({ navigationOpen: !state.navigationOpen })),
}));
