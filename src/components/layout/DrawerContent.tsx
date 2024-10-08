import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import HeaderOffset from "./HeaderOffset";
import useNavigation, { INavigationItem } from "@/hooks/useNavigation";

interface IDrawerContentProps {
  open?: boolean;
  onClick?: () => void;
}

export default function DrawerContent({
  open = true,
  onClick,
}: IDrawerContentProps) {
  const navigation = useNavigation();

  function handleClick(navItem: INavigationItem) {
    navItem.action();
    if (onClick) onClick();
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
            <Tooltip
              title={navItem.label}
              disableInteractive
              placement="right"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={navItem.active}
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
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );
}
