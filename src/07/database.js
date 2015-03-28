import Datastore from 'nedb'

import { error } from 'quiver/error'

import { 
  async, promisifyMethods 
} from 'quiver/promise'

import {
  configMiddleware
} from 'quiver/component'

const createDb = dbPath => {
  const db = new Datastore({ filename: dbPath })

  return promisifyMethods(db, 
    ['loadDatabase', 'find', 'findOne'])
}

export const databaseMiddleware = configMiddleware(
  async(function*(config) {
    if(config.db) return

    const { dbPath } = config

    const db = createDb(dbPath)
    yield db.loadDatabase()

    config.db = db
  }))