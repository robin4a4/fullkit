import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./renderer/_default.page.server.ts",
    "./templating/index.ts",
    "./vite-plugin-ssr.config.ts",
  ],
  format: "esm",
  clean: true,
  sourcemap: true,
  dts: true,
});
