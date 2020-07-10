/* eslint-disable @typescript-eslint/no-unused-vars */
import {Command, flags} from '@oclif/command'
import {DEFAULT_TEMPLATE_PERSON} from '../templates'
import {integer} from '@oclif/command/lib/flags'

import {requiredFields, columnWidth, defaultMaxColumns} from '../definitions'

const Table = require('cli-table3')

export default class View extends Command {
  static description = 'View all your Clips'

  static flags = {
    help: flags.help({char: 'h'}),
    all: flags.boolean({char: 'a'}),
  }

  // static args = []

  async run() {
    /// / DATABASE ////
    // initialize db
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('clipprs_db.json')
    const db = low(adapter)

    // setup defaults //
    db.defaults({people: [], count: 0})
    .write()

    /// \DATABASE ///

    const {flags} = this.parse(View)

    const dbData = db.get('people')
    .value()

    // we can use the all flag to show every property for every obj - clipprss view -a
    // we dont do this by default though as there are many blank spaces
    // by default we just show fName, lName, DOB and bio
    let headValues: string[] = []

    if (flags.all) {
      // we still limit the number of columns otherwise we risk ugly wrapping.
      // Within search we can view them ALL.
      const max_columns = Math.floor((process.stdout.columns || defaultMaxColumns) / columnWidth)
      // Auto-generate the table by going through every person and adding their keys in
      for (const person of dbData) {
        headValues = headValues.concat(Object.keys(person))
      }
      // remove duplicates by using the Set() type
      // and then converting back to array
      if (max_columns < headValues.length) {
        // we couldn't show all the information as there was too much
        this.log(`\n  Could only display ${max_columns}/${headValues.length} fields due to the terminal width.\n\n  To view more information, widen your terminal window \n  OR use the *View* option within the *search* command.`)
      }
      headValues = [...(new Set(headValues))].slice(0, max_columns)
    } else {
      headValues = requiredFields
    }
    const columnWidths = new Array(headValues.length).fill(columnWidth)
    const table = new Table({head: headValues, wordWrap: true, colWidths: columnWidths})

    if (dbData.length > 0) {
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
    } else {
      table.push([])
      this.log('No data found. Run clipprs new to add a clip, or clipprs setup to link to an older database.')
    }
    this.log(table.toString())
  }
}
