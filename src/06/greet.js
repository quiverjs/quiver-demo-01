import { async } from 'quiver-core/promise'

import { 
  simpleHandlerBuilder,
} from 'quiver-core/component'

import { userHandler } from './user'

export const greetHandler = simpleHandlerBuilder(
  config => {
    const { getUser, greet='Hello' } = config

    return async(function*(args) {
      const { username } = args

      const user = yield getUser({ username })
      return greet + ', ' + user.name
    })
  }, 'void', 'text')
 .inputHandler(userHandler, 'getUser')