import { async } from 'quiver-promise'

import { 
  loadSimpleHandler,
  simpleHandlerBuilder,
  inputHandlerMiddleware, 
} from 'quiver-component'

import { userHandler } from './user'

export var greetHandler = simpleHandlerBuilder(
  async(function*(config) {
    var { greet='Hello' } = config

    var getUser = yield loadSimpleHandler(
      config, userHandler, 'void', 'json')

    return async(function*(args) {
      var { username } = args

      var user = yield getUser({ username })
      return greet + ', ' + user.name
    })
  }), 'void', 'text')