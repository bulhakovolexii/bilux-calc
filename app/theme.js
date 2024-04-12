"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#62ad5f",
      light: "#81bd7f",
      dark: "#447942",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f2e46a",
      light: "#f4e987",
      dark: "#a99f4a",
      contrastText: "#000",
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
