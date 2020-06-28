import {Command, flags} from '@oclif/command'
import {initializeDB, addEntryDB, getAllDataDB} from '../db-manager'
import { DEFAULT_TEMPLATE_PERSON } from '../templates'
import { integer } from '@oclif/command/lib/flags'


export default class Search extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Search)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /Users/harrisonbroadbent/Documents/projects/cliprs/src/commands/search.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
