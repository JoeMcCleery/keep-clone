import AddNoteBar from "@/components/input/AddNoteBar";
import NotesList from "@/components/layout/NotesList";

export default function HomePage() {
  return (
    <>
      <AddNoteBar />
      <NotesList />
    </>
  );
}
