import { 
  simpleHandlerLoader
} from 'quiver-core/component'

import { fileHandler } from 'quiver-file-component'

export let userHandler = fileHandler()
  .argsFilter(args => {
    args.path = '/' + args.username + '.json'
  })
  .configAlias({
    dirPath: 'userDir'
  })
  .setLoader(simpleHandlerLoader('void', 'json'))