import Datastore from 'nedb'

import { error } from 'quiver-core/error'

import { 
  async, promisifyMethods 
} from 'quiver-core/promise'

import {
  configMiddleware
} from 'quiver-core/component'

let createDb = dbPath => {
  let db = new Datastore({ filename: dbPath })

  return promisifyMethods(db, 
    ['loadDatabase', 'find', 'findOne'])
}

export let databaseMiddleware = configMiddleware(
  async(function*(config) {
    if(config.db) return

    let { dbPath } = config

    let db = createDb(dbPath)
    yield db.loadDatabase()

    config.db = db
  }))