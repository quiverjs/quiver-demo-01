import { async } from 'quiver-promise'

import { 
  simpleHandler,
} from 'quiver-component'

import { getUserFilter } from './user.js'

export var greetHandler = simpleHandler(
  args => {
    var { user } = args

    return 'Hello, ' + user.name
  }, 'void', 'text')
  .addMiddleware(getUserFilter)