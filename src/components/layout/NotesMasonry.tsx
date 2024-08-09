import { Note } from "@/rxdb/types/generated/note";
import { Masonry } from "@mui/lab";
import { RxDocument } from "rxdb";
import NoteForm from "@/components/form/NoteForm";

interface INotesMasonryProps {
  notes: RxDocument<Note>[];
}

export default function NotesMasonry({ notes }: INotesMasonryProps) {
  return (
    <Masonry
      spacing={2}
      sequential
      columns={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      sx={{ width: "auto" }}
    >
      {notes.map((note) => (
        <NoteForm
          key={note.id}
          defaults={note}
          autoSubmit
        />
      ))}
    </Masonry>
  );
}
