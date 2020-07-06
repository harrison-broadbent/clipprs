/* eslint-disable @typescript-eslint/no-unused-vars */
import {Command, flags} from '@oclif/command'
import {DEFAULT_TEMPLATE_PERSON} from '../templates'
import {integer} from '@oclif/command/lib/flags'
const Table = require('cli-table3')

export default class View extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  // static args = []

  async run() {
    /// / DATABASE ////
    // initialize db
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('cliprs_db.json')
    const db = low(adapter)

    // setup defaults //
    db.defaults({people: [], count: 0})
    .write()

    /// \DATABASE ///

    const dbData = db.get('people')
    .value()

    // Auto-generate the table by going through every person and adding their keys in
    let headValues = []
    for (const person of dbData) {
      headValues = headValues.concat(Object.keys(person))
    }
    // remove duplicates by using the Set() type
    // and then converting back to array
    headValues = [...(new Set(headValues))]
    this.log(headValues)
    const table = new Table({head: headValues})

    // populate the table with either "" or the corresponding value.
    for (const person of dbData) {
      const entry = []
      for (const key of headValues) {
        if (person[key]) {
          entry.push(person[key])
        } else {
          entry.push(' ')
        }
      }
      table.push(entry)
    }
    this.log(table)
    this.log(table.toString())
  }
}
