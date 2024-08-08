import { Archive, ArchiveOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface IArchivedToggleProps {
  archived: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

export default function ArchivedToggle({
  archived,
  onChange,
}: IArchivedToggleProps) {
  return (
    <Tooltip
      title={archived ? "Unarchive" : "Archive"}
      disableInteractive
    >
      <IconButton onClick={() => onChange((a) => !a)}>
        {archived ? (
          <Archive fontSize="small" />
        ) : (
          <ArchiveOutlined fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
