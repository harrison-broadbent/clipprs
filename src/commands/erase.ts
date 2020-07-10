/* eslint-disable @typescript-eslint/no-unused-vars */
import {Command, flags} from '@oclif/command'
import {integer} from '@oclif/command/lib/flags'
import {format} from 'path'

const {Confirm} = require('cliprs-enquirer')

/// DATABASE ///
// initialize db
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('cliprs_db.json')
const db = low(adapter)

// setup defaults //
const defaults = {people: [], count: 0}
db.defaults(defaults)
.write()
/// \DATABASE ///

const confirmErasePrompt = new Confirm({
  name: 'confirm-erase',
  message: 'Are you sure you want to erase? THIS CANNOT BE UNDONE.',
})

const doublecheckErasePrompt = new Confirm({
  name: 'confirm-doublecheck',
  message: 'Are you really sure? THIS CANNOT BE UNDONE.',
})

export default class New extends Command {
  static description = 'Erase all your clips'

  async run() {
    confirmErasePrompt.run()
    .then((confirm: boolean) => {
      if (confirm) {
        doublecheckErasePrompt.run()
        .then((doubleCheck: boolean) => {
          db.setState(defaults)
          .write()
        })
      }
    })
    .catch(console.error)
  }
}
