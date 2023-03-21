import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/customElements.ts", "./src/reactivity.ts", "./src/renderer.ts"],
  clean: true,
  sourcemap: true,
  dts: true,
});
