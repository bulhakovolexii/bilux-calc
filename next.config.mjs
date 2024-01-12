import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./pages/docs-theme.config.jsx",
  latex: true,
});

export default withNextra({
  reactStrictMode: true,
});
