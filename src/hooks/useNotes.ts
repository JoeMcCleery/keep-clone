import { Note } from "@/rxdb/types/generated/note";
import { useRxData } from "rxdb-hooks";

export default function useNotes(
  archived: boolean,
  pinned: boolean,
  labels: string[]
) {
  const { result, isFetching } = useRxData<Note>("notes", (collection) =>
    collection.find({
      selector: {
        archived,
        pinned,
        ...(labels.length > 0 && { labels: { $in: labels } }),
      },
    })
  );

  return { notes: result, isFetching };
}
