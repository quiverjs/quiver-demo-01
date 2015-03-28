import { 
  router, simpleHandler, 
  simpleHandlerBuilder
} from 'quiver/component'

import { fileHandler } from 'quiver-file-component'

const helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

const greetHandler = simpleHandlerBuilder(
  config => {
    const { greet='Hello' } = config

    return args => 
      greet + ', ' + args.name
  }, 'void', 'text')

const userHandler = fileHandler()

export const main = router()
  .staticRoute('/', helloHandler)
  .paramRoute('/greet/:name', greetHandler)
  .paramRoute('/user/:restpath', userHandler)