import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import { FormDataProvider } from "@/contexts/FormDataContext";
import theme from "./theme";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="uk">
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <FormDataProvider>
                <Box maxWidth="1100px" height="600px">
                  {children}
                </Box>
              </FormDataProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </>
  );
}
