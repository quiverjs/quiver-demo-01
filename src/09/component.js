import { 
  router, simpleHandler
} from 'quiver-component'

import { userHandler } from './user.js'
import { greetHandler } from './greet.js'

var helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

export var main = router()
  .addStaticRoute(helloHandler, '/')
  .addParamRoute(greetHandler, '/greet/:username')
  .addParamRoute(userHandler, '/user/:username')