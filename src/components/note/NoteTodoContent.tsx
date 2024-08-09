import { NoteContentItem } from "@/rxdb/types/note";
import { Divider } from "@mui/material";
import NoteTodoContentItem from "@/components/note/NoteTodoContentItem";
import { Dispatch, SetStateAction } from "react";

interface INoteTodoContentProps {
  content: NoteContentItem[];
  autofocus?: boolean;
  onChange: Dispatch<SetStateAction<NoteContentItem[]>>;
}

export default function NoteTodoContent({
  content,
  autofocus = false,
  onChange,
}: INoteTodoContentProps) {
  const completed = content.filter((c) => c.completed);
  const uncompleted = content.filter((c) => !c.completed);

  function updateContent(index: number, item: NoteContentItem | null) {
    const newContent = [...content];
    if (item === null) {
      if (newContent.length === 1) {
        newContent[0] = { text: "", completed: false };
      } else {
        newContent.splice(index, 1);
      }
    } else if (item.text.includes("\n")) {
      newContent.splice(index + 1, 0, { text: "", completed: item.completed });
    } else {
      newContent[index] = item;
    }
    onChange(newContent);
  }

  return (
    <>
      {uncompleted.map((item) => (
        <NoteTodoContentItem
          key={content.indexOf(item)}
          item={item}
          autofocus={autofocus}
          onChange={(newItem) => updateContent(content.indexOf(item), newItem)}
        />
      ))}
      {completed.length > 0 && uncompleted.length > 0 && (
        <Divider sx={{ mx: 2 }} />
      )}
      {completed.map((item) => (
        <NoteTodoContentItem
          key={content.indexOf(item)}
          item={item}
          autofocus={autofocus}
          onChange={(newItem) => updateContent(content.indexOf(item), newItem)}
        />
      ))}
    </>
  );
}
