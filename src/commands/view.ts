import {Command, flags} from '@oclif/command'
import {initializeDB, addEntryDB, getAllDataDB} from '../db-manager'
import { DEFAULT_TEMPLATE_PERSON } from '../templates'
import { integer } from '@oclif/command/lib/flags'


export default class View extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  // static args = []

  async run() {
    //// DATABASE ////
    // initialize db    
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('cliprs_db.json')
    const db = low(adapter)

    // setup defaults //
    db.defaults({people: [], count: 0 })
    .write()

    //// \DATABASE ////

    const dbData =  db.get('people')
                      .value()
    for (let person of dbData) {
      let output = ""
      for (let key of Object.keys(person)) {
        output += `${key} : ${person[key]} | `
      }
      this.log(output)
    }

  }
}
