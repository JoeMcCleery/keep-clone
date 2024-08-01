"use client";

import { styled } from "@mui/material";

const Offset = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export default function HeaderOffset() {
  return <Offset />;
}
