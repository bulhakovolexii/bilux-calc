import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import { ModelProvider } from "@/app/contexts/ModelContext";
import theme from "./theme";

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ModelProvider>
              <Box maxWidth="1100px" height="600px" p={2} mx="auto">
                {children}
              </Box>
            </ModelProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
