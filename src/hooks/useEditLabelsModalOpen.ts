import { EditLabelsModalOpenContext } from "@/components/provider/EditLabelsModalOpenProvider";
import { useContext } from "react";

export default function useEditLabelsModalOpen() {
  return useContext(EditLabelsModalOpenContext);
}
