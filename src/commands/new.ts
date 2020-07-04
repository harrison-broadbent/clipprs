import {Command, flags} from '@oclif/command'
import { DEFAULT_TEMPLATE_PERSON, PROMPT_TEMPLATE} from '../templates'
import { integer } from '@oclif/command/lib/flags'
import { format } from 'path';

const { Form } = require('enquirer');

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


// dynamically generate prompt from template
const newPersonPrompt = new Form({
  name: 'new-entry',
  message: 'Clip a new person into your system - ', 
  choices : () => {
    let prompt_choices = []
    for (let key of Object.keys(DEFAULT_TEMPLATE_PERSON)) {
      let promptTemplate = Object.create(PROMPT_TEMPLATE)
      promptTemplate.name = key
      promptTemplate.message = key
      prompt_choices.push(promptTemplate)
    }
    // prompt_choices.push(BLANK_INPUT_TEMPLATE)
    return prompt_choices
  }
})
// import {DB_PATH} from '../definitions'
// const fs = require('fs')

export default class New extends Command {
  static description = "Clip a new person into your system"

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    newPersonPrompt.run()
      .then((newPersonObject: object) => {
        db.get('people')
        .push(newPersonObject)
        .write()
  
        db.update('count', (n: number) => n + 1)
          .write()
        })
      .catch(console.error())
  }

}