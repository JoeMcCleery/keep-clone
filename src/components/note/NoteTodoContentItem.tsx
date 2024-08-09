"use client";

import { NoteContentItem } from "@/rxdb/types/note";
import { Close } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  IconButton,
  Input,
  Tooltip,
  useTheme,
} from "@mui/material";

interface INoteTodoContentItemProps {
  item: NoteContentItem;
  autofocus?: boolean;
  onChange: (newItem: NoteContentItem | null) => void;
}

export default function NoteTodoContentItem({
  item,
  autofocus = false,
  onChange,
}: INoteTodoContentItemProps) {
  const theme = useTheme();

  function toggleCompleted() {
    onChange({ ...item, completed: !item.completed });
  }

  function updateText(text: string) {
    onChange({ ...item, text });
  }

  function removeItem() {
    onChange(null);
  }

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      px={1}
      sx={{
        ".delete-btn": {
          opacity: 0,
          transition: "opacity ease 200ms",
        },
        "&:hover .delete-btn": {
          opacity: 1,
        },
      }}
    >
      <Checkbox
        size="small"
        checked={item.completed}
        onClick={toggleCompleted}
        color="default"
      />
      <Input
        autoFocus={autofocus}
        onChange={(e) => updateText(e.target.value)}
        value={item.text}
        fullWidth
        disableUnderline
        multiline
        sx={{
          py: 1,
          fontSize: "0.9em",
          textDecoration: item.completed ? "line-through" : "none",
          textDecorationColor: theme.palette.text.disabled,
          color: item.completed
            ? theme.palette.text.disabled
            : theme.palette.text.primary,
        }}
      />
      <Tooltip
        title="Delete"
        disableInteractive
      >
        <IconButton
          onClick={removeItem}
          className="delete-btn"
        >
          <Close fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
