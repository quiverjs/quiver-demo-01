import { 
  router, simpleHandler
} from 'quiver/component'

import { fileHandler } from 'quiver-file-component'

const helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

const greetHandler = simpleHandler(
  args => 'Hello, ' + args.name,
  'void', 'text')

const userHandler = fileHandler()

export const main = router()
  .staticRoute('/', helloHandler)
  .paramRoute('/greet/:name', greetHandler)
  .paramRoute('/user/:restpath', userHandler)