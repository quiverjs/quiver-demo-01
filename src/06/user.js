import Datastore from 'nedb'
import { error } from 'quiver-core/error'

import { 
  async, promisifyMethods 
} from 'quiver-core/promise'

import {
  simpleHandlerBuilder
} from 'quiver-core/component'

var createDb = dbPath => {
  var db = new Datastore({ filename: dbPath })

  return promisifyMethods(db, 
    ['loadDatabase', 'find', 'findOne'])
}

export var userHandler = simpleHandlerBuilder(
  async(function*(config) {
    var { dbPath } = config
    
    var db = createDb(dbPath)
    yield db.loadDatabase()

    return async(function*(args) {
      var { username } = args

      var user = yield db.findOne({ username })
      if(!user) throw error(404, 'user not found')

      return user
    })
  }), 'void', 'json')