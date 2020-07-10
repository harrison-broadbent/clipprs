/* eslint-disable @typescript-eslint/no-unused-vars */
import {Command, flags} from '@oclif/command'
import {integer, string} from '@oclif/command/lib/flags'
import {format} from 'path'
import {Interface} from 'readline'

import {requiredFields, columnWidth, defaultMaxColumns} from '../definitions'
import {DEFAULT_TEMPLATE_PERSON, PROMPT_TEMPLATE} from '../templates'

const {AutoComplete, Select, Form, Confirm, Editable} = require('cliprs-enquirer')
const Table = require('cli-table3')

/// DATABASE ///
// initialize db
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('cliprs_db.json')
const db = low(adapter)

// setup defaults //
db.defaults({people: [], count: 0})
.write()
/// DATABASE ///

function editPerson(entry: object) {
  interface Field {
    name: string;
    message: string;
    initial: string;
    editable: boolean;
    required: boolean;
  }

  const editPersonPrompt = new Editable({
    name: 'edit-entry',
    message: 'Edit a Clip - ',
    choices: () => {
      const prompt_choices = []
      // eslint-disable-next-line guard-for-in
      for (const key in entry) {
        const field: Field = {
          name: key,
          message: key,
          initial: entry[key],
          editable: true,
          required: requiredFields.includes(key),
        }
        prompt_choices.push(field)
      }
      return prompt_choices
    },
  })
  editPersonPrompt.run()
  .then((editedEntry: object) => {
    console.log(editedEntry)
    db.get('people')
    .remove(entry)
    .write()

    db.get('people')
    .push(editedEntry)
    .write()
    // db.get('people')
    // .find(entry)
    // .assign(editedEntry)
    // .write()
  })
}

const viewEditDeleteClose = new Select({
  name: '',
  message: '',
  choices: ['View', 'Edit', 'Delete', 'Close'],
})

const confirmDeletePrompt = new Confirm({
  name: 'confirm-delete',
  message: 'Delete?',
})

// dynamically generate prompt from template
const searchPrompt = new AutoComplete({
  name: 'search-entry',
  message: 'Search and edit your Clips - ',
  choices: () => {
    const prompt_choices = []
    const dbData = db.get('people').value()
    for (const entry of dbData) {
      prompt_choices.push(`${entry['First Name']} ${entry['Last Name']}`)
    }

    // prompt_choices.push(BLANK_INPUT_TEMPLATE)
    return prompt_choices
  },
})
// import {DB_PATH} from '../definitions'
// const fs = require('fs')

export default class New extends Command {
  static description = 'Search through your Clips'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  // first we search through all our entries
  // then, we allow the user to edit or delete the entry
  async run() {
    searchPrompt.run()
    .then((answer: string) => {
      const dbData = db.get('people').value()
      const [firstName, lastName] = answer.split(' ')

      const entry = db.get('people')
      .find({'First Name': firstName, 'Last Name': lastName})
      .value()

      viewEditDeleteClose.run()
      .then((answer: string) => {
        // VIEW
        if (answer === 'View') {
          // widen colWidth as we are only displaying 2 colums
          const table = new Table({wordWrap: true, colWidths: [columnWidth * 1.5, columnWidth * 1.5]})
          const keys = Object.keys(entry)

          for (const key of keys) {
            // use es6 computed name properties
            table.push({
              [key]: entry[key],
            })
          }
          this.log(table.toString())
        // EDIT
        } else if (answer === 'Edit') {
          editPerson(entry)
        // DELETE
        } else if (answer === 'Delete') {
          confirmDeletePrompt.run()
          .then((answer: any) => {
            if (answer === true) {
              db.get('people')
              .remove({'First Name': firstName, 'Last Name': lastName})
              .write()

              // sanity check to ensure n > 0 always
              db.update('count', (n: number) => (n > 0) ? (n - 1) : (n))
              .write()
            } else {
              this.log('Cancelling deletion.')
            }
          })
        // CLOSE
        } else if (answer === 'Close') {
          // CLOSE
          // instead of closing, we could return to the search field
          // eslint-disable-next-line no-useless-return
          return
        }
      })
    })
    .catch(console.error)
  }
}
