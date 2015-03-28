import { async } from 'quiver/promise'

import { 
  simpleHandlerBuilder
} from 'quiver/component'

import { getUserFilter } from './user'

export const greetHandler = simpleHandlerBuilder(
  config => {
    const { greet='Hello' } = config

    return args =>
      greet + ', ' + args.user.name
      
  }, 'void', 'text')
  .middleware(getUserFilter)