import { async } from 'quiver-core/promise'

import { 
  simpleHandlerBuilder
} from 'quiver-core/component'

import { userHandler } from './user'

export let greetHandler = simpleHandlerBuilder(
  config => {
    let { getUser, greet='Hello' } = config

    return async(function*(args) {
      let { username } = args

      let user = yield getUser({ username })
      return greet + ', ' + user.name
    })
  }, 'void', 'text')
 .inputHandler(userHandler, 'getUser')