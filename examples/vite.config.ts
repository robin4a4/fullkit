import ssr from "vite-plugin-ssr/plugin";
import type { UserConfig } from "vite";

export default {
  plugins: [ssr()],
} as UserConfig;
