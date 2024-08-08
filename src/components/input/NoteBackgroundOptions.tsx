import { NoteBackground } from "@/rxdb/types/note";
import {
  Check,
  ColorLensOutlined,
  FormatColorResetOutlined,
} from "@mui/icons-material";
import {
  Tooltip,
  IconButton,
  Badge,
  Popover,
  Box,
  styled,
  Button,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const CircleButton = styled(Button)(({ theme }) => ({
  height: 32,
  width: 32,
  minHeight: 0,
  minWidth: 0,
  padding: 0,
  borderRadius: "100%",
  borderWidth: 2,
  borderStyle: "solid",
  "&:hover, &:focus, &.selected": {
    borderColor: theme.palette.success.main,
  },
}));

interface INoteBackgroundOptionsProps {
  background: NoteBackground;
  onChange: (option: NoteBackground) => void;
}

export default function NoteBackgroundOptions({
  background,
  onChange,
}: INoteBackgroundOptionsProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const options: NoteBackground[] = [
    "default",
    "coral",
    "peach",
    "sand",
    "mint",
    "sage",
    "fog",
    "storm",
    "dusk",
    "blossom",
    "clay",
    "chalk",
  ];

  return (
    <>
      <Tooltip
        title="Background options"
        disableInteractive
      >
        <IconButton onClick={handleClick}>
          <ColorLensOutlined />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          display="flex"
          gap={1}
          p={2}
        >
          {options.map((option) => {
            const selected = option === background;
            const title = option[0].toUpperCase() + option.slice(1);
            const isDefault = option === "default";
            const icon = isDefault ? <FormatColorResetOutlined /> : "";
            const colour = isDefault ? "inherit" : option;

            return (
              <Tooltip
                key={option}
                title={title}
                disableInteractive
              >
                <Badge
                  invisible={!selected}
                  color="success"
                  badgeContent={<Check fontSize="inherit" />}
                >
                  <CircleButton
                    centerRipple
                    variant="contained"
                    disableElevation
                    onClick={() => onChange(option)}
                    color={colour}
                    className={selected ? "selected" : ""}
                    sx={{
                      borderColor: isDefault
                        ? "inherit"
                        : theme.palette[option].main,
                    }}
                  >
                    {icon}
                  </CircleButton>
                </Badge>
              </Tooltip>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}
