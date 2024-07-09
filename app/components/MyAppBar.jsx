"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  useScrollTrigger,
} from "@mui/material";
import Link from "next/link";
import { cloneElement } from "react";

function ElevationScroll(props) {
  const { children, window, color } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  if (color === "transparent") {
    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
      color: trigger ? "secondary" : "transparent",
    });
  } else {
    return cloneElement(children, {
      elevation: 4,
      color: color,
    });
  }
}

export default function MyAppBar({ color, elevation, ref }) {
  return (
    <ElevationScroll color={color}>
      <AppBar color={color} elevation={elevation}>
        <Container maxWidth="xl">
          <Toolbar disableGutters ref={ref}>
            <Box
              sx={{
                width: "48px",
                height: "48px",
                backgroundImage: "url(/logo.svg)",
                backgroundSize: "cover",
              }}
            />
            <Typography
              component={Link}
              href="/"
              variant="h5"
              sx={{
                fontWeight: 700,
                ml: 2,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BILUX CALC
            </Typography>
            <Box sx={{ flexGrow: 1 }}>{/* pages */}</Box>
            <Button
              color="primary"
              variant="contained"
              target="_blob"
              href="https://bilux.ua/dealership/"
            >
              Стати дилером
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
