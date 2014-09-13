import { simpleHandler } from 'quiver-component'

export var main = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')