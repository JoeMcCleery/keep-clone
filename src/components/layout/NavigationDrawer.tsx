"use client";

import {
  Box,
  CSSObject,
  Drawer,
  styled,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerContent from "./DrawerContent";
import { useGlobalStore } from "@/store";
import { useShallow } from "zustand/react/shallow";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DesktopDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflowX: "hidden",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MobileDrawer = styled(Drawer)(() => ({
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflowX: "hidden",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

export default function NavigationDrawer() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { drawerOpen, toggleDrawerOpen } = useGlobalStore(
    useShallow((state) => ({
      drawerOpen: state.navigationOpen,
      toggleDrawerOpen: state.toggleNavigationOpen,
    }))
  );

  return (
    <Box
      component="nav"
      sx={{ display: "flex" }}
    >
      {mobile ? (
        <MobileDrawer
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawerOpen}
        >
          <DrawerContent onClick={toggleDrawerOpen} />
        </MobileDrawer>
      ) : (
        <DesktopDrawer
          variant="permanent"
          open={drawerOpen}
        >
          <DrawerContent open={drawerOpen} />
        </DesktopDrawer>
      )}
    </Box>
  );
}
