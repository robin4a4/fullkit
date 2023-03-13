import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/renderer/_default.page.client.ts",
    "./src/renderer/_default.page.server.ts",
    "./vite-plugin-ssr.config.ts",
    "./src/index.ts",
    "./src/templating/index.ts",
  ],
  format: "esm",
  clean: true,
  sourcemap: true,
  dts: true,
});
