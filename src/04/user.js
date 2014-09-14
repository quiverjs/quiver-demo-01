import { 
  argsFilter, configAliasMiddleware
} from 'quiver-component'

import { fileHandler } from 'quiver-file-component'

export var userHandler = fileHandler()
  .addMiddleware(argsFilter(
    args => {
      args.path = '/' + args.username + '.json'

      return args
    }))
  .addMiddleware(configAliasMiddleware({
    dirPath: 'userDir'
  }))