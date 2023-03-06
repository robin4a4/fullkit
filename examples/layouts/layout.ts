import { HtmlParser } from "compile-include-html";

const includer = new HtmlParser();
export const layout = includer.readFile("./layouts/test.html");
