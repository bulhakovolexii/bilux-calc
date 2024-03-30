"use client";

import { Close, InfoOutlined } from "@mui/icons-material";
import { Box, Drawer, Fab, Hidden, IconButton, Paper } from "@mui/material";
import { useState } from "react";

export default function ({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Hidden mdDown>
        <Box sx={{ flex: "1 1 50%", height: "506px" }}>
          <Paper
            variant="outlined"
            sx={{ height: "100%", overflowY: "auto", px: 2, py: 1 }}
          >
            {children}
          </Paper>
        </Box>
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
