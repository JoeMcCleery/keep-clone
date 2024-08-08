"use client";

import useLabels from "@/hooks/useLabels";
import { Box, Chip, ListItem, makeStyles, styled } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface ILabelsArrayProps {
  labelIds: string[];
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

export default function LabelArray({ labelIds, onChange }: ILabelsArrayProps) {
  const { labels } = useLabels();
  const activeLabels = labels.filter((label) => labelIds.includes(label.id));

  function removeLabel(labelId: string) {
    onChange((ids) => ids.filter((id) => id !== labelId));
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
      }}
      component="ul"
    >
      {activeLabels.map((label) => (
        <ListItem key={label.id}>
          <CustomChip
            size="small"
            label={label.name}
            onClick={() => removeLabel(label.id)}
            onDelete={() => removeLabel(label.id)}
          />
        </ListItem>
      ))}
    </Box>
  );
}
