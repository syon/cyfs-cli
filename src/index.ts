import { Command, flags } from "@oclif/command";
import bridge from "./bridge";

class CyfsCli extends Command {
  static description =
    "🌀 cyfs :: Cyclone in file system. Recipe based file selection CLI tool.";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-p, --preview)
    preview: flags.boolean({ char: "p" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(CyfsCli);

    if (!args.file) {
      const msg = "file required.\nExample:\n cyfs order.yaml";
      this.error(msg);
    }
    const result = await bridge(args, flags);
    this.log(result);
  }
}

export = CyfsCli;
