import ssr from "vite-plugin-ssr/plugin";
import type { UserConfig } from "vite";

const fs = require("fs");
const path = require("path");

function replaceIncludes() {
  return {
    name: "replace-includes",
    async transform(code, id) {
      if (!/\/(pages|layouts)\//.test(id) || path.extname(id) !== ".ts") {
        return;
      }
      console.log("transforming", id);
      const includesRegex = /<include src=['"](.+?)['"]\/>/g;
      let match = includesRegex.exec(code);
      let newCode = code;

      while (match) {
        const includePath = match[1];
        const includeFilePath = path.resolve(path.dirname(id), includePath);
        console.log(includePath, includeFilePath);
        try {
          const includeFileContent = fs.readFileSync(includeFilePath, "utf8");
          const replacement = `<span>${includeFileContent}</span>`;
          newCode = newCode.replace(match[0], replacement);
        } catch (error) {
          console.error(`Error while reading file ${includeFilePath}:`, error);
        }

        match = includesRegex.exec(code);
      }

      return newCode;
    },
  };
}

export default {
  plugins: [
    ssr({
      includeAssetsImportedByServer: true,
    }),
    replaceIncludes(),
  ],
} as UserConfig;
