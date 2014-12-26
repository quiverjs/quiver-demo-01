import { async } from 'quiver-core/promise'

import { 
  simpleHandlerBuilder
} from 'quiver-core/component'

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
 .inputHandler(userHandler, 'getUser')