import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HeaderOffset from "./HeaderOffset";
import useNavigation, { INavigationItem } from "@/hooks/useNavigation";
import useNavOpen from "@/hooks/useNavOpen";

interface IDrawerContentProps {
  open?: boolean;
}

export default function DrawerContent({ open = true }: IDrawerContentProps) {
  const { toggleNavOpen } = useNavOpen();
  const navigation = useNavigation();

  function handleClick(navItem: INavigationItem) {
    navItem.action();
    toggleNavOpen();
  }

  return (
    <>
      <HeaderOffset />
      <List>
        {navigation.map((navItem, index) => (
          <ListItem
            key={navItem.label + index}
            disablePadding
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={navItem.active}
              title={navItem.label}
              onClick={() => handleClick(navItem)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {navItem.icon}
              </ListItemIcon>
              <ListItemText
                primary={navItem.label}
                sx={{
                  opacity: open ? 1 : 0,
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
    </>
  );
}
