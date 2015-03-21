import { 
  router, simpleHandler,
} from 'quiver-core/component'

import { fileHandler } from 'quiver-file-component'

import { userHandler } from './user'
import { greetHandler } from './greet'

const helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')

export const main = router()
  .staticRoute('/', helloHandler)
  .paramRoute('/greet/:name', greetHandler)
  .paramRoute('/user/:username', userHandler)