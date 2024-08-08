import { Label } from "@/rxdb/types/generated/label";
import { useRxData } from "rxdb-hooks";

export default function useLabels() {
  const { result, isFetching } = useRxData<Label>("labels", (collection) =>
    collection.find()
  );

  return { labels: result, isFetching };
}
