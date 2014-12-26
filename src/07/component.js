import { 
  router, simpleHandler
} from 'quiver-core/component'

import { userHandler } from './user'
import { greetHandler } from './greet'

var helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

export var main = router()
  .staticRoute('/', helloHandler)
  .paramRoute('/greet/:username', greetHandler)
  .paramRoute('/user/:username', userHandler)