import ssr from "vite-plugin-ssr/plugin";
import type { UserConfig } from "vite";
import { ExperimentalCompileIncludePlugin } from "compile-include-html";

export default {
  plugins: [
    ssr({
      includeAssetsImportedByServer: true,
    }),
    ExperimentalCompileIncludePlugin(),
  ],
} as UserConfig;
