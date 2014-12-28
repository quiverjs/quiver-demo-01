import { async } from 'quiver-core/promise'

import { 
  simpleHandlerBuilder
} from 'quiver-core/component'

import { getUserFilter } from './user'

export var greetHandler = simpleHandlerBuilder(
  config => {
    var { greet='Hello' } = config

    return args =>
      greet + ', ' + args.user.name
      
  }, 'void', 'text')
  .middleware(getUserFilter)