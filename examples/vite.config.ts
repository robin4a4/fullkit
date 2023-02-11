import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";
import { Includer } from "compile-include-html";

const htmlPlugin = () => {
  return {
    name: "html-transform",
    transform(html: string) {
      console.log(html);
    },
  };
};

const config: UserConfig = {
  plugins: [
    ssr({
      includeAssetsImportedByServer: true,
    }),
  ],
};

export default config;
