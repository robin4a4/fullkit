import { Includer } from "compile-include-html";

const includer = new Includer();
export const layout = includer.readFile("./layouts/test.html");
