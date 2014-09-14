import { fileHandler } from 'quiver-file-component'
import { 
  router, simpleHandler, 
  simpleHandlerBuilder
} from 'quiver-component'

var helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

var greetHandler = simpleHandlerBuilder(
  config => {
    var { greet='Hello' } = config

    return args => 
      greet + ', ' + args.name
  }, 'void', 'text')

var userHandler = fileHandler()

export var main = router()
  .addStaticRoute(helloHandler, '/')
  .addParamRoute(greetHandler, '/greet/:name')
  .addParamRoute(userHandler, '/user/:restpath')