import { PushPin, PushPinOutlined } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface IPinnedToggleProps {
  pinned: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

export default function PinnedToggle({ pinned, onChange }: IPinnedToggleProps) {
  return (
    <Tooltip
      title={pinned ? "Unpin note" : "Pin note"}
      disableInteractive
    >
      <IconButton onClick={() => onChange((p) => !p)}>
        {pinned ? <PushPin /> : <PushPinOutlined />}
      </IconButton>
    </Tooltip>
  );
}
