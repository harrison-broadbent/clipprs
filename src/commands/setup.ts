/* eslint-disable @typescript-eslint/no-unused-vars */
import {Command, flags} from '@oclif/command'
import {integer} from '@oclif/command/lib/flags'
import {format} from 'path'

import fs = require('fs')
const path = require('path')
const defaults = require('./../../config/settings.json')

const {Select, Input, NumberPrompt} = require('clipprs-enquirer')

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

function updateConfig(content: object) {
  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'config', 'settings.json'),
    JSON.stringify(content, null, 2)
  )
}

const setupPrompt = new Select({
  name: 'setup-prompt',
  message: 'What would you like to change?',
  choices: ['Database File Path', 'Table Column Widths'],
})

const dbFilePathPrompt = new Input({
  name: 'db-file-path',
  message: 'Enter a new location to save the database file (TAB to autocomplete)\n',
  initial: path.resolve(defaults.db.path),
  validate: (path: string) => {
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
      return true
    }
    // else
    return 'Invalid path. Please try again.'
  },
})

const columnWidthPrompt = new NumberPrompt({
  name: 'column-width',
  message: 'Enter a new value for the column width (used when running *clipprs view*).',
  initial: defaults.view.columnWidth,
  validate: (width: number) => {
    if (Number.isInteger(width)) {
      if (width > 0) {
        return true
      }

      return 'Please enter a value greater than 0.'
    }

    return 'Please enter an integer.'
  },
})

export default class Setup extends Command {
  static description = 'Change settings for Clipprs - '

  async run() {
    this.log(`${defaults.startupMessage} | ${defaults.version}`)
    setupPrompt.run()
    .then((answer: string) => {
      if (answer === 'Database File Path') {
        // change path
        dbFilePathPrompt.run()
        .then((path: string) => {
          defaults.db.path = path
          updateConfig(defaults)
          this.log(`Updated path to ${path}`)
        })
      } else if (answer === 'Table Column Widths') {
        columnWidthPrompt.run()
        .then((width: number) => {
          defaults.view.columnWidth = width
          updateConfig(defaults)
        })
      }
    })
  }
}
