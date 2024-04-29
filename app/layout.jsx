import { InputDataProvider } from "@/app/context/InputDataContext";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <InputDataProvider>
              <Box maxWidth="1132px" height="632px" p={2} mx="auto">
                {children}
              </Box>
            </InputDataProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
