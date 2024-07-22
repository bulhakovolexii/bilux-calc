import { InputDataProvider } from "@/app/context/InputDataContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Script from "next/script";
import Background from "./components/Background";

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N1RH5HL6QP"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-N1RH5HL6QP');
          `}
        </Script>
      </head>
      <body style={{ overflowX: "hidden" }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <InputDataProvider>
              <Background maxWidth="lg" />
              {children}
            </InputDataProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
