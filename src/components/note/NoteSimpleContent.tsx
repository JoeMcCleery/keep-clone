import { NoteContentItem } from "@/rxdb/types/note";
import { Input } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface INoteSimpleContentProps {
  content: NoteContentItem[];
  autofocus?: boolean;
  onChange: Dispatch<SetStateAction<NoteContentItem[]>>;
}

export default function NoteSimpleContent({
  content,
  autofocus = false,
  onChange,
}: INoteSimpleContentProps) {
  let text = content.map((item) => item.text).join("\n");

  function updateContent(text: string) {
    const newContent: NoteContentItem[] = text
      .split("\n")
      .map((text) => ({ text, completed: false }));
    onChange(newContent);
  }

  return (
    <Input
      autoFocus={autofocus}
      placeholder="Take a note..."
      onChange={(e) => updateContent(e.target.value)}
      value={text}
      fullWidth
      disableUnderline
      multiline
      sx={{ px: 2, py: 1, fontSize: "0.9em" }}
    />
  );
}
