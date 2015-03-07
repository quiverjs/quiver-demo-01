import Datastore from 'nedb'
import { error } from 'quiver-core/error'

import { 
  async, promisifyMethods 
} from 'quiver-core/promise'

import {
  simpleHandlerBuilder
} from 'quiver-core/component'

let createDb = dbPath => {
  let db = new Datastore({ filename: dbPath })

  return promisifyMethods(db, 
    ['loadDatabase', 'find', 'findOne'])
}

export let userHandler = simpleHandlerBuilder(
  async(function*(config) {
    let { dbPath } = config
    
    let db = createDb(dbPath)
    yield db.loadDatabase()

    return async(function*(args) {
      let { username } = args

      let user = yield db.findOne({ username })
      if(!user) throw error(404, 'user not found')

      return user
    })
  }), 'void', 'json')