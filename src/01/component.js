import { simpleHandler } from 'quiver-core/component'

export var main = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')