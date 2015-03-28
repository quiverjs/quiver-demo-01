import { 
  simpleHandlerLoader
} from 'quiver/component'

import { fileHandler } from 'quiver-file-component'

export const userHandler = fileHandler()
  .argsFilter(args => {
    args.path = '/' + args.username + '.json'
  })
  .configAlias({
    dirPath: 'userDir'
  })
  .setLoader(simpleHandlerLoader('void', 'json'))