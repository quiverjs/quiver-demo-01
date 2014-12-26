import { argsFilter } from 'quiver-core/component'
import { fileHandler } from 'quiver-file-component'

export var userHandler = fileHandler()
  .middleware(argsFilter(
    args => {
      args.path = '/' + args.username + '.json'

      return args
    }))
  .configAlias({
    dirPath: 'userDir'
  })