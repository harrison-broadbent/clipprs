import {Command, flags} from '@oclif/command'
import {initializeDB, addEntryDB, getAllDataDB} from '../db-manager'
import { DEFAULT_TEMPLATE_PERSON } from '../templates'
import { integer } from '@oclif/command/lib/flags'

const { Form } = require('enquirer');

// dynamically generate prompt from template
const prompt = new Form({
  name: 'new-entry',
  message: 'Clip a new person into your system - ', 
  choices : () => {

    let prompt_choices = []
    let promptTemplate = {
      name: '',
      message: '',
      initial: ''
    }

    for (let key of Object.keys(DEFAULT_TEMPLATE_PERSON)) {
      // let hyphenatedLowerKey = key.split(' ').join('-').toLowerCase()
      // promptTemplate.name = hyphenatedLowerKey
      promptTemplate.name = key
      promptTemplate.message = key
      prompt_choices.push(promptTemplate)
    }
    return prompt_choices

  }
})
// import {DB_PATH} from '../definitions'
// const fs = require('fs')

export default class New extends Command {
  static description = "Clip a new person into your system"

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'first name to save'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: ''}]

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

    const {args, flags} = this.parse(New)
    let newPerson = DEFAULT_TEMPLATE_PERSON
    const name = flags.name

    if (typeof name === 'string') {
      newPerson["First Name"] = name
    
      db.get('people')
        .push(newPerson)
        .write()
  
      db.update('count', (n: number) => n + 1)
        .write()
  
      this.log(db.get('people'))
      this.log(newPerson.toString())  
    } else {
      this.log(`
        ERROR:  Name is empty
        >>>     Please input a name using -n [NAME]
      `)
    }

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }

}