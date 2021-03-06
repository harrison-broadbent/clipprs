/* eslint-disable @typescript-eslint/no-unused-vars */
import {Command, flags} from '@oclif/command'
import {integer} from '@oclif/command/lib/flags'
import {format} from 'path'

const path = require('path')
const defaults = require('./../../config/settings.json')
const {Confirm} = require('clipprs-enquirer')

/// DATABASE ///
// initialize db
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(defaults.db.path, defaults.db.filename))
const db = low(adapter)

// setup defaults //
db.defaults(defaults.db.defaults)
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
    this.log(`${defaults.startupMessage} | ${defaults.version}`)
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
