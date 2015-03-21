import Datastore from 'nedb'
import { error } from 'quiver-core/error'

import { 
  async, promisifyMethods 
} from 'quiver-core/promise'

import {
  simpleHandlerBuilder
} from 'quiver-core/component'

const createDb = dbPath => {
  const db = new Datastore({ filename: dbPath })

  return promisifyMethods(db, 
    ['loadDatabase', 'find', 'findOne'])
}

export const userHandler = simpleHandlerBuilder(
  async(function*(config) {
    const { dbPath } = config
    
    const db = createDb(dbPath)
    yield db.loadDatabase()

    return async(function*(args) {
      const { username } = args

      const user = yield db.findOne({ username })
      if(!user) throw error(404, 'user not found')

      return user
    })
  }), 'void', 'json')