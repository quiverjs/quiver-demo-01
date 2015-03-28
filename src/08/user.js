import Datastore from 'nedb'

import { error } from 'quiver/error'

import { 
  async, promisifyMethods 
} from 'quiver/promise'

import {
  argsBuilderFilter,
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

export const getUserFilter = argsBuilderFilter(
  config => {
    const { getUser } = config

    return async(function*(args) {
      if(args.user) return

      const { username } = args
      args.user = yield getUser({ username })
    })
  })
 .inputHandler(userHandler, 'getUser')