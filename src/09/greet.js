import { async } from 'quiver-promise'

import { 
  simpleHandlerBuilder
} from 'quiver-component'

import { getUserFilter } from './user.js'

export var greetHandler = simpleHandlerBuilder(
  config => {
    var { greet='Hello' } = config

    return args => {
      var { user } = args

      return greet + ', ' + user.name
    }
  }, 'void', 'text')
  .addMiddleware(getUserFilter)