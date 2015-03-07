import { 
  router, simpleHandler
} from 'quiver-core/component'

import { fileHandler } from 'quiver-file-component'

let helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

let greetHandler = simpleHandler(
  args => 'Hello, ' + args.name,
  'void', 'text')

let userHandler = fileHandler()

export let main = router()
  .staticRoute('/', helloHandler)
  .paramRoute('/greet/:name', greetHandler)
  .paramRoute('/user/:restpath', userHandler)