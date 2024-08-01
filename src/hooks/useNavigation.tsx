import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb } from "@mui/icons-material";

interface INavigation {
  icon?: ReactNode;
  label: string;
  action: () => void;
}

export default function useNavigation() {
  const router = useRouter();

  const navigation: INavigation[] = [
    {
      icon: <Lightbulb />,
      label: "Notes",
      action: () => router.push("/"),
    },
  ];

  return navigation;
}
