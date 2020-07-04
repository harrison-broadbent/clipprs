import {Command, flags} from '@oclif/command'
import { integer } from '@oclif/command/lib/flags'
import { format } from 'path';

import { DEFAULT_TEMPLATE_PERSON, PROMPT_TEMPLATE} from '../templates'

const { AutoComplete } = require('enquirer');

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
const searchPrompt = new AutoComplete({
  name: 'search-entry',
  message: 'Search through your Clips - ', 
  choices : () => {
    let prompt_choices = []
    let dbData = db.get('people').value()
    for (let entry of dbData) {
      prompt_choices.push(`${entry["First Name"]} ${entry["Last Name"]}`)
    }
    // prompt_choices.push(BLANK_INPUT_TEMPLATE)
    return prompt_choices
  }
})
// import {DB_PATH} from '../definitions'
// const fs = require('fs')

export default class New extends Command {
  static description = "Search through your Clips"

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    searchPrompt.run()
      .then((answer: string) => {
        const dbData = db.get('people').value()
        const [firstName, lastName] = answer.split(" ")
        
        const entry = dbData.filter((person: any) => person["First Name"] == firstName && person["Last Name"] == lastName)[0]
        this.log(entry)
      })
      .catch(console.error())
  }
}