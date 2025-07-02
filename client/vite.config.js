import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import tailwindcssVite from "@tailwindcss/vite";
import typography from "@tailwindcss/typography";

export default defineConfig({
  plugins: [
    react(),
    tailwindcssVite({
      config: {
        plugins: [typography], // ✅ Add typography plugin here
      },
    }),
  ],
});
