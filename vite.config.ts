import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Restaurants",
        short_name: "My Restaurants",
        theme_color: "#777777",
        description: "A simple app to manage your restaurants",
        display: "fullscreen",
      },
    }),
  ],
});
