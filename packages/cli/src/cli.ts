import { cac } from "cac";
import { startServer } from "@renderkit/server";

const cli = cac("renderkit");

// dev
cli
  .command("[root]", "start dev server") // default command
  .alias("serve")
  .action(async (root: string | undefined) => {
    try {
      startServer({ root });
    } catch (e: any) {
      console.log(`error when starting dev server:\n${e.stack}`);
      process.exit(1);
    }
  });

cli.help();
cli.version("0.0.1");

cli.parse();
