import { 
  router, simpleHandler, 
  simpleHandlerBuilder
} from 'quiver-core/component'

import { fileHandler } from 'quiver-file-component'

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
  .staticRoute('/', helloHandler)
  .paramRoute('/greet/:name', greetHandler)
  .paramRoute('/user/:restpath', userHandler)