"use client";

import useLabels from "@/hooks/useLabels";
import { Box, Chip, styled, Tooltip } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface ILabelsArrayProps {
  noteLabels: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
}

const CustomChip = styled(Chip)(() => ({
  "& .MuiChip-deleteIcon": {
    display: "none",
  },
  "&:hover": {
    "& .MuiChip-deleteIcon": {
      display: "block",
    },
  },
}));

export default function LabelArray({
  noteLabels,
  onChange,
}: ILabelsArrayProps) {
  const { labels } = useLabels();
  const activeLabels = labels.filter((label) => noteLabels.includes(label.id));

  function removeLabel(labelId: string) {
    onChange((ids) => ids.filter((id) => id !== labelId));
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        px: 2,
        py: 1,
        gap: 1,
      }}
    >
      {activeLabels.map((label) => (
        <Tooltip
          key={label.id}
          title="Remove label"
          disableInteractive
        >
          <CustomChip
            size="small"
            label={label.name}
            onClick={() => removeLabel(label.id)}
            onDelete={() => removeLabel(label.id)}
          />
        </Tooltip>
      ))}
    </Box>
  );
}
