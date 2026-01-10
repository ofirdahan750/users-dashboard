import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      constants: path.resolve(__dirname, "./src/constants"),
      types: path.resolve(__dirname, "./src/types"),
      utils: path.resolve(__dirname, "./src/utils"),
      store: path.resolve(__dirname, "./src/store"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      "components/common": path.resolve(__dirname, "./src/components/common"),
    },
  },
});
