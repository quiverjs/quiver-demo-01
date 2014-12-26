import { 
  router, simpleHandler
} from 'quiver-core/component'

import { fileHandler } from 'quiver-file-component'

var helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

var greetHandler = simpleHandler(
  args => 'Hello, ' + args.name,
  'void', 'text')

var userHandler = fileHandler()

export var main = router()
  .staticRoute('/', helloHandler)
  .paramRoute('/greet/:name', greetHandler)
  .paramRoute('/user/:restpath', userHandler)