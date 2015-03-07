import Datastore from 'nedb'

import { error } from 'quiver-core/error'

import { 
  async, promisifyMethods 
} from 'quiver-core/promise'

import {
  argsBuilderFilter,
  simpleHandlerBuilder
} from 'quiver-core/component'

import {
  databaseMiddleware
} from './database'

export let userHandler = simpleHandlerBuilder(
  config => {
    let { db } = config

    return async(function*(args) {
      let { username } = args

      let user = yield db.findOne({ username })
      if(!user) throw error(404, 'user not found')

      return user
    })
  }, 'void', 'json')
  .middleware(databaseMiddleware)

export let getUserFilter = argsBuilderFilter(
  config => {
    let { getUser } = config

    return async(function*(args) {
      if(args.user) return

      let { username } = args
      args.user = yield getUser({ username })
    })
  })
 .inputHandler(userHandler, 'getUser')