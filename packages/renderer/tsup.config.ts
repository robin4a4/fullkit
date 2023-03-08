import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./renderer/_default.page.server.ts",
    "./index.ts",
    "./templating/index.ts",
    "./vite-plugin-ssr.config.ts",
  ],
  clean: true,
  sourcemap: true,
  dts: true,
});
