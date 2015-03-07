import { async } from 'quiver-core/promise'

import { 
  simpleHandlerBuilder
} from 'quiver-core/component'

import { getUserFilter } from './user'

export let greetHandler = simpleHandlerBuilder(
  config => {
    let { greet='Hello' } = config

    return args =>
      greet + ', ' + args.user.name
      
  }, 'void', 'text')
  .middleware(getUserFilter)