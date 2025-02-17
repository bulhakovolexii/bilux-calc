import { GoogleAnalytics } from "@next/third-parties/google";
import { InputDataProvider } from "@/context/InputDataContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/app/theme";
import Script from "next/script";
import Background from "@/components/Background";

export const metadata = {
  title: "Bilux-CALC",
  description:
    "Онлайн-калькулятор для розрахунку потенційної економії та строку окупності системи стельового променевого опалення. Введіть параметри приміщення та поточної системи опалення і отримайте оцінку витрат та строку окупності для переходу на інноваційне опалювання «Білюкс».",
  openGraph: {
    title: "Bilux-CALC",
    description:
      "Онлайн-калькулятор для розрахунку потенційної економії та строку окупності системи стельового променевого опалення. Введіть параметри приміщення та поточної системи опалення і отримайте оцінку витрат та строку окупності для переходу на інноваційне опалювання «Білюкс».",
    image: "/logo.svg",
    url: "https://bilux-calc.vercel.app/",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8fc58f" />
        <meta name="apple-mobile-web-app-title" content="Bilux-CALC" />
        <meta name="application-name" content="Bilux-CALC" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#fefefe" />
      </head>
      <body>
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
      <GoogleAnalytics gaId="G-N1RH5HL6QP" />
    </html>
  );
}
