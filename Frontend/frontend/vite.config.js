import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Remove TailwindCSS from Vite plugins (handled via PostCSS now)
export default defineConfig({
  plugins: [react()],
});
