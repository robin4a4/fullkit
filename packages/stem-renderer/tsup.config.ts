import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "renderer/_default.page.client": "./src/renderer/_default.page.client.ts",
    "renderer/_default.page.server": "./src/renderer/_default.page.server.ts",
    index: "./src/index.ts",
    "vite-plugin-ssr.config": "vite-plugin-ssr.config.ts",
  },
  format: "esm",
  clean: true,
  sourcemap: true,
  dts: true,
});
