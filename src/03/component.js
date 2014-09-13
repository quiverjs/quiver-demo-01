import { fileHandler } from 'quiver-file-component'
import { 
  router, simpleHandler,
  argsFilter, configAliasMiddleware
} from 'quiver-component'

var helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

var greetHandler = simpleHandler(
  args => 'Hello, ' + args.name,
  'void', 'text')

var userHandler = fileHandler()
  .addMiddleware(argsFilter(
    args => {
      args.path = '/' + args.username + '.json'

      return args
    }))
  .addMiddleware(configAliasMiddleware({
    dirPath: 'userDir'
  }))

export var main = router()
  .addStaticRoute(helloHandler, '/')
  .addParamRoute(greetHandler, '/greet/:name')
  .addParamRoute(userHandler, '/user/:username')