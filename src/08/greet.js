import { async } from 'quiver-core/promise'

import { 
  simpleHandlerBuilder
} from 'quiver-core/component'

import { getUserFilter } from './user'

export const greetHandler = simpleHandlerBuilder(
  config => {
    const { greet='Hello' } = config

    return args =>
      greet + ', ' + args.user.name
      
  }, 'void', 'text')
  .middleware(getUserFilter)