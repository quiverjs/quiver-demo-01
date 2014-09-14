import { fileHandler } from 'quiver-file-component'
import { 
  router, simpleHandler,
  argsFilter, configAliasMiddleware
} from 'quiver-component'

import { userHandler } from './user.js'
import { greetHandler } from './greet.js'

var helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

export var main = router()
  .addStaticRoute(helloHandler, '/')
  .addParamRoute(greetHandler, '/greet/:name')
  .addParamRoute(userHandler, '/user/:username')