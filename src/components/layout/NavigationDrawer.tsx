"use client";

import useNavOpen from "@/hooks/useNavOpen";
import { Inbox } from "@mui/icons-material";
import {
  Box,
  CSSObject,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
} from "@mui/material";
import HeaderOffset from "@/components/layout/HeaderOffset";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const MiniDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavigationDrawer() {
  const { navOpen } = useNavOpen();

  return (
    <MiniDrawer
      variant="permanent"
      open={navOpen}
    >
      <HeaderOffset />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: navOpen ? "initial" : "center",
                px: 2.5,
              }}
              title={text}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: navOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Inbox />
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  opacity: navOpen ? 1 : 0,
                }}
                primaryTypographyProps={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MiniDrawer>
  );
}
