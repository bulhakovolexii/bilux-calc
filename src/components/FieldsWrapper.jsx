"use client";

import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

export default function FormInputs({ children }) {
  const theme = useTheme();
  return (
    <Box
      flex="1 1 50%"
      maxWidth="100%"
      sx={{ [theme.breakpoints.up("md")]: { width: "453px" } }}
    >
      {children}
    </Box>
  );
}
