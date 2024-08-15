import { Label } from "@/rxdb/types/generated/label";
import { useRxData } from "rxdb-hooks";

export default function useLabels() {
  const { result, isFetching } = useRxData<Label>("labels", (collection) =>
    collection.find({
      sort: [{ name: "asc" }],
    })
  );

  let labels = result;
  if (result.length > 0) {
    labels = labels.sort((a, b) => a.name.localeCompare(b.name));
  }

  return { labels, isFetching };
}
