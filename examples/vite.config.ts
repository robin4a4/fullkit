import ssr from "vite-plugin-ssr/plugin";
import type { UserConfig } from "vite";

import { HtmlParser } from "compile-include-html";
import type { Plugin } from "vite";

const parseReplacement = (withvalue: string) => {
  const variableReplacements: Record<string, string> = {};
  const valuesArray = withvalue.split(";");
  valuesArray.forEach((value) => {
    const [keyFromArray, valueFromArray] = value.split(":");
    if (keyFromArray && valueFromArray) {
      const key = keyFromArray.trim().replaceAll(" ", "");
      const value = valueFromArray.trim().replace(/^\${(.*)}$/, "$1");
      variableReplacements[key] = value;
    }
  });
  return variableReplacements;
};

function getWithValueAndFullString(source: string): {
  withValues: string[];
  fullStrings: string[];
  srcValues: string[];
} {
  const regex = /<include\s+src="([^"]*)"(?:\s+with="([^"]*)")?><\/include>/g;
  const withValues: string[] = [];
  const fullStrings: string[] = [];
  const srcValues: string[] = [];
  let match;

  while ((match = regex.exec(source)) !== null) {
    srcValues.push(match[1] ? match[1] : "");

    withValues.push(match[2] ?? "");
    fullStrings.push(match[0] ?? "");
  }
  return { withValues, fullStrings, srcValues };
}

const includeHtmlPlugin = (): Plugin => {
  const clientFileRegex = /\.client\./i;
  return {
    name: "include-html",
    transform(code, id) {
      if (!clientFileRegex.test(id)) {
        return;
      }

      const { withValues, fullStrings, srcValues } =
        getWithValueAndFullString(code);

      const folder = id.substring(0, id.lastIndexOf("/"));
      srcValues.forEach((src, index) => {
        console.log(parseReplacement(withValues[index]));
        const htmlParser = new HtmlParser({
          variableReplacements: parseReplacement(withValues[index]),
          basePath: folder,
        });
        console.log(folder);
        const source = htmlParser.readFile(src);
        const compiledSource = htmlParser.transform(source);
        console.log(compiledSource);
        code = code.replaceAll(fullStrings[index], compiledSource);
      });

      return {
        code,
      };
    },
  };
};
export default {
  plugins: [
    ssr({
      includeAssetsImportedByServer: true,
    }),
    includeHtmlPlugin(),
  ],
} as UserConfig;
