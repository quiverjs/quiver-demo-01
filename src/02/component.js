import { fileHandler } from 'quiver-file-component'
import { 
  router, simpleHandler
} from 'quiver-component'

var helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

var greetHandler = simpleHandler(
  args => 'Hello, ' + args.name,
  'void', 'text')

var userHandler = fileHandler()

export var main = router()
  .addStaticRoute(helloHandler, '/')
  .addParamRoute(greetHandler, '/greet/:name')
  .addParamRoute(userHandler, '/user/:restpath')