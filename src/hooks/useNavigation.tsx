import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Archive, Edit, Label, Lightbulb } from "@mui/icons-material";
import useLabels from "./useLabels";
import { useGlobalStore } from "@/store";

export interface INavigationItem {
  icon: ReactNode;
  label: string;
  active: boolean;
  action: () => void;
}

export default function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { labels } = useLabels();
  const toggleEditLabelsModalOpen = useGlobalStore(
    (state) => state.toggleEditLabelsModalOpen
  );

  const labelNavigation: INavigationItem[] = labels.map((label) => ({
    icon: <Label />,
    label: label.name,
    active: pathname === `/label/${label.name}`,
    action: () => router.push(`/label/${label.name}`),
  }));

  const navigation: INavigationItem[] = [
    {
      icon: <Lightbulb />,
      label: "Notes",
      active: pathname === "/",
      action: () => router.push("/"),
    },
    ...labelNavigation,
    {
      icon: <Edit />,
      label: "Edit labels",
      active: false,
      action: toggleEditLabelsModalOpen,
    },
    {
      icon: <Archive />,
      label: "Archive",
      active: pathname === "/archive",
      action: () => router.push("/archive"),
    },
  ];

  return navigation;
}
