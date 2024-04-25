"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8fc58f",
    },
    secondary: {
      main: "#f4e982",
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
        invisible: { backgroundColor: "transparent" },
      },
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
