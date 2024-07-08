"use client";

import {
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";

import CustomAppBar from "./components/CustomAppBar";
import { cloneElement } from "react";

const Background = ({ maxWidth }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{ position: "relative", height: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "870px",
            minHeight: "800px",
            top: "-165px",
            right: "-356px",
            bgcolor: "#F4E982",
            borderRadius: "50%",
            filter: "blur(276px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "876px",
            minHeight: "692px",
            bottom: "0px",
            right: "-170px",
            bgcolor: "#8FC590",
            borderRadius: "50%",
            filter: "blur(276px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            maxWidth: "100%",
            width: "900px",
            minHeight: "900px",
            opacity: 0.1,
            top: "-150px",
            right: "-60px",
            backgroundImage: "url(/logo.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      </Container>
    </Box>
  );
};

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? "secondary" : "transparent",
  });
}

export default function Home() {
  return (
    <Box>
      <Background maxWidth="lg" />
      <ElevationScroll>
        <CustomAppBar color="transparent" />
      </ElevationScroll>
      <Toolbar />
      <Container maxWidth="lg"></Container>
    </Box>
  );
}
