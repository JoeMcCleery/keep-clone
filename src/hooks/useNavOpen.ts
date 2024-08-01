import { NavOpenContext } from "@/components/provider/NavOpenProvider";
import { useContext } from "react";

export default function useNavOpen() {
  return useContext(NavOpenContext);
}
