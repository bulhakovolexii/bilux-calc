export default function manifest() {
  return {
    name: "Bilux-CALC",
    short_name: "Bilux-CALC",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#fefefe",
    background_color: "#fefefe",
    display: "standalone",
    start_url: "/",
  };
}
