import Datastore from 'nedb'
import { error } from 'quiver-core/error'

import { 
  async, promisifyMethods 
} from 'quiver-core/promise'

import {
  configMiddleware
} from 'quiver-core/component'

var createDb = dbPath => {
  var db = new Datastore({ filename: dbPath })

  return promisifyMethods(db, 
    ['loadDatabase', 'find', 'findOne'])
}

export var databaseMiddleware = configMiddleware(
  async(function*(config) {
    if(config.db) return

    var { dbPath } = config

    var db = createDb(dbPath)
    yield db.loadDatabase()

    config.db = db
  }))