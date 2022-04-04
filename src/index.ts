import { program } from "commander";
import create from "./order/create";

program
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  .version(`v${require("../package.json").version}`)
  .usage("<command> [options]");

program
  .command("create <app-name>")
  .description("create a new project")
  .action(async (name: string) => {
    await create(name);
  });

program.parse(process.argv);
