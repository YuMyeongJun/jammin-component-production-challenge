import react from "@vitejs/plugin-react";
import * as path from "path";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

import libCss from "vite-plugin-libcss";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "component-package",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-textarea-autosize"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-textarea-autosize": "TextareaAutosize",
        },
      },
      treeshake: true,
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    dts({
      exclude: ["src/App.tsx", "src/main.tsx"],
    }),
    tsconfigPaths(),
    svgr(),
    libCss(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
