import {Command, flags} from '@oclif/command'
import {initializeDB, addEntryDB, getAllDataDB} from '../db-manager'
import { PERSON_TEMPLATE } from '../definitions'

export default class View extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  // static args = []

  async run() {
    // const {args, flags} = this.parse(View)
    initializeDB(this)
    // initialize data if this is the first run
    // see db-manager.ts for these

    const dbData = getAllDataDB()
    this.log(dbData.people)
    for (let person of dbData.people) {
      this.log(person, typeof person)
      for (const [key, value] of Object.entries(person)) {
        this.log(`${key} : ${value}`)
      }
      this.log('\n')
    }

  }
}
