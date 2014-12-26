import { async } from 'quiver-core/promise'

import { 
  simpleHandlerBuilder
} from 'quiver-core/component'

import { getUserFilter } from './user'

export var greetHandler = simpleHandlerBuilder(
  config => {
    var { greet='Hello' } = config

    return args => {
      var { user } = args

      return greet + ', ' + user.name
    }
  }, 'void', 'text')
  .middleware(getUserFilter)