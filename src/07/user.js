import Datastore from 'nedb'

import { error } from 'quiver-error'

import { 
  async, promisifyMethods 
} from 'quiver-promise'

import {
  argsBuilderFilter,
  simpleHandlerBuilder,
  inputHandlerMiddleware
} from 'quiver-component'

import {
  databaseMiddleware
} from './database.js'

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
  .addMiddleware(databaseMiddleware)

export var getUserFilter = argsBuilderFilter(
  config => {
    var { getUser } = config

    return async(function*(args) {
      if(args.user) return args

      var { username } = args
      args.user = yield getUser({ username })

      return args
    })
  })
  .addMiddleware(inputHandlerMiddleware(
    userHandler, 'getUser'))