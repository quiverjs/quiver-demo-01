import { async } from 'quiver-promise'

import { 
  simpleHandlerLoader,
  simpleHandlerBuilder,
  inputHandlerMiddleware, 
} from 'quiver-component'

import { userHandler } from './user.js'

export var greetHandler = simpleHandlerBuilder(
  config => {
    var { getUser } = config

    return async(function*(args) {
      var { username } = args

      var user = yield getUser({ username })
      return 'Hello, ' + user.name
    })
  }, 'void', 'text')
  .addMiddleware(inputHandlerMiddleware(
    userHandler, 'getUser', { 
      loader: simpleHandlerLoader('void', 'json')
    }))
