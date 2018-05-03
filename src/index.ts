import {Command, flags} from '@oclif/command'
import cyfs from './cyfs'

class CyfsCli extends Command {
  static description = '🌀 cyfs :: Cyclone in file system. Recipe based file selection CLI tool.'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(CyfsCli)

    if (!args.file) {
      const msg = 'file required.\nExample:\n cyfs order.yaml'
      this.error(msg)
    }
    const files = cyfs(args.file)
    console.log(files.join('\n'))
  }
}

export = CyfsCli
