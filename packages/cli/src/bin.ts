#!/usr/bin/env node

import { Command } from "commander";
import { server } from "./server/action";

const program = new Command();

program.version("0.0.1");

program.command("server").action(server);

program.parse(process.argv);
