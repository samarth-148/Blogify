/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: { "/api": "https://blogify-vp1v.onrender.com" },
  },
  plugins: [react()],
});
