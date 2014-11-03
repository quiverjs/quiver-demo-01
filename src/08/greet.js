import { async } from 'quiver-promise'

import { 
  simpleHandlerBuilder,
  inputHandlerMiddleware, 
} from 'quiver-component'

import { userHandler } from './user'

export var greetHandler = simpleHandlerBuilder(
  config => {
    var { getUser, greet='Hello' } = config

    return async(function*(args) {
      var { username } = args

      var user = yield getUser({ username })
      return greet + ', ' + user.name
    })
  }, 'void', 'text')
  .addMiddleware(inputHandlerMiddleware(
    userHandler, 'getUser'))
