/* eslint-disable key-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Command, flags} from '@oclif/command'
import {DEFAULT_TEMPLATE_PERSON, PROMPT_TEMPLATE} from '../templates'
import {integer} from '@oclif/command/lib/flags'
import {format} from 'path'

const _ = require('lodash')
const path = require('path')
const defaults = require('./../../config/settings.json')
const {Form, Select, Editable} = require('clipprs-enquirer')

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

// dynamically generate prompt from template
const newPersonPrompt = new Editable({
  name: 'new-entry',
  message:  'Add a person to your Clips.\n [ctrl+n] to add fields,\n [ctrl+r] to remove.\n The default fields are required.\n',
  choices: () => {
    const prompt_choices = []
    for (const key of Object.keys(DEFAULT_TEMPLATE_PERSON)) {
      const promptTemplate = _.cloneDeep(PROMPT_TEMPLATE)
      promptTemplate.name = key
      promptTemplate.message = key
      promptTemplate.required = defaults.requiredFields.includes(key)
      prompt_choices.push(promptTemplate)
    }
    // prompt_choices.push(BLANK_INPUT_TEMPLATE)
    return prompt_choices
  },
  result(value: object) {
    // trim excess spaces from object values
    return _.mapValues(value, (val: string) => val.trim())
  },
  validate: (answer: object) => {
    // check that field is not blank
    if (Object.values(answer).map(s => s.trim()).includes('')) {
      return 'Error. Blank fields are not allowed.'
    }
    return true
  },
})

export default class New extends Command {
  static description = 'Clip a new person into your system'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    this.log(`${defaults.startupMessage} | ${defaults.version}`)
    newPersonPrompt.run()
    .then((newPersonObject: object) => {
      db.get('people')
      .push(newPersonObject)
      .write()

      db.update('count', (n: number) => n + 1)
      .write()
    })
    .catch(console.error)
  }
}
