import {Command, flags} from '@oclif/command'
import bridge from './bridge'

class CyfsCli extends Command {
  static description = '🌀 cyfs :: Cyclone in file system. Recipe based file selection CLI tool.'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    preview: flags.boolean({char: 'p'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(CyfsCli)

    if (!args.file) {
      const msg = 'file required.\nExample:\n cyfs order.yaml'
      this.error(msg)
    }
    const result = bridge(args, flags)
    console.log(result)
  }
}

export = CyfsCli
