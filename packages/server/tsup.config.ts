import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/cli.ts"],
  clean: true,
  sourcemap: true,
  dts: true,
});
