const fs = require('fs')
import {DB_PATH} from './definitions'

export function initializeDB(instance: any) {
  let JSONData
  if (fs.existsSync(DB_PATH)) {
    instance.log('loading data')
    JSONData = getAllDataDB()
  } else {
    instance.log('initializing database...')
    const empty_db = {
      people: [],
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(empty_db))
    JSONData = empty_db
  }
  return JSONData
}

export function getAllDataDB() {
  // return all data from the DB as JSON object
  let JSONData = JSON.parse(fs.readFileSync(DB_PATH))
  return {people: JSONData.people}
}

export function addEntryDB(entryObj: object) {
  // append an object to the db
  let dbData = getAllDataDB()
  dbData.people.push(JSON.stringify(entryObj))
  updateDB(dbData)
}

export function updateDB(data:object) {
  // overwrite the db with an object
  fs.writeFileSync(DB_PATH, JSON.stringify(data))
}
