import { simpleHandler } from 'quiver-core/component'

export let main = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')