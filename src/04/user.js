import { fileHandler } from 'quiver-file-component'
import {
  argsFilter, configAliasMiddleware
} from 'quiver-component'

export var userHandler = fileHandler()
  .addMiddleware(argsFilter(
    args => {
      args.path = '/' + args.username + '.json'

      return args
    }))
  .addMiddleware(configAliasMiddleware({
    dirPath: 'userDir'
  }))
