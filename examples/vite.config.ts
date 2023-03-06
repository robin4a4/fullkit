import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [
    ssr({
      includeAssetsImportedByServer: true,
    }),
  ],
};

export default config;
