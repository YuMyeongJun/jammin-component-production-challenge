import { defineConfig } from "vitest/config";
import * as path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
    },
  },
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, 'src/index.ts'),
  //     name: 'component-package',
  //     fileName: (format) => `index.${format}.js`,
  //   },
  //   rollupOptions: {
  //     external: ['react', 'react-dom'],
  //     output: {
  //       globals: {
  //         react: 'React',
  //         'react-dom': 'ReactDOM',
  //       },
  //     },
  //   },
  //   sourcemap: true,
  //   emptyOutDir: true,
  // },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
