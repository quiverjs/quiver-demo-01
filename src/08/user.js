import Datastore from 'nedb'

import { error } from 'quiver-error'

import { 
  async, promisifyMethods 
} from 'quiver-promise'

import {
  simpleHandlerBuilder
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