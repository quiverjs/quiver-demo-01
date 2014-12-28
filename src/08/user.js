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

export var userHandler = simpleHandlerBuilder(
  config => {
    var { db } = config

    return async(function*(args) {
      var { username } = args

      var user = yield db.findOne({ username })
      if(!user) throw error(404, 'user not found')

      return user
    })
  }, 'void', 'json')
  .middleware(databaseMiddleware)

export var getUserFilter = argsBuilderFilter(
  config => {
    var { getUser } = config

    return async(function*(args) {
      if(args.user) return

      var { username } = args
      args.user = yield getUser({ username })
    })
  })
 .inputHandler(userHandler, 'getUser')