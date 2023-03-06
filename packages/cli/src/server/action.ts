import { exec } from "../exec";

export const server = () => {
  exec("ts-node ./server/index.ts");
};
