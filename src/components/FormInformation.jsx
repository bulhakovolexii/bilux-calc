"use client";

import { useTheme } from "@emotion/react";
import { Close, InfoOutlined } from "@mui/icons-material";
import { Box, Drawer, Fab, Hidden, Paper } from "@mui/material";
import { useState } from "react";

export default function FormInformation({ children }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <>
      <Hidden mdDown>
        <Paper
          variant="outlined"
          sx={{
            [theme.breakpoints.up("md")]: { width: "453px" },
            height: "100%",
            flex: "1 1 50%",
            px: 2,
            py: 1,
            overflowY: "auto",
          }}
        >
          {children}
        </Paper>
      </Hidden>
      <Hidden mdUp>
        <Fab
          size="small"
          color="primary"
          sx={{ position: "absolute", bottom: "16px", right: "16px" }}
          onClick={() => setOpen(true)}
        >
          <InfoOutlined />
        </Fab>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
          <Box width="75vw" p={2}>
            <Fab
              size="small"
              color="primary"
              sx={{ position: "fixed", top: "16px", right: "16px" }}
              onClick={() => setOpen(false)}
            >
              <Close />
            </Fab>
            {children}
          </Box>
        </Drawer>
      </Hidden>
    </>
  );
}
