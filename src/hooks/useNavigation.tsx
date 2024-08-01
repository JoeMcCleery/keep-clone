import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Archive, Edit, Label, Lightbulb } from "@mui/icons-material";

interface INavigation {
  icon?: ReactNode;
  label: string;
  active: boolean;
  action: () => void;
}

export default function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navigation: INavigation[] = [
    {
      icon: <Lightbulb />,
      label: "Notes",
      active: pathname == "/",
      action: () => router.push("/"),
    },
    {
      icon: <Label />,
      label: "test",
      active: pathname == "/label/test",
      action: () => router.push("/label/test"),
    },
    {
      icon: <Edit />,
      label: "Edit Labels",
      active: false,
      action: () => console.log("Hello Edit Label Modal"),
    },
    {
      icon: <Archive />,
      label: "Archive",
      active: pathname == "/archive",
      action: () => router.push("/archive"),
    },
  ];

  return navigation;
}
