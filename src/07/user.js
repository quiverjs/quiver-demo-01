import Datastore from 'nedb'
import { error } from 'quiver/error'

import { 
  async, promisifyMethods 
} from 'quiver/promise'

import {
  simpleHandlerBuilder
} from 'quiver/component'

import {
  databaseMiddleware
} from './database'

export const userHandler = simpleHandlerBuilder(
  config => {
    const { db } = config

    return async(function*(args) {
      const { username } = args

      const user = yield db.findOne({ username })
      if(!user) throw error(404, 'user not found')

      return user
    })
  }, 'void', 'json')
  .middleware(databaseMiddleware)