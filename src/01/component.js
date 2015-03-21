import { simpleHandler } from 'quiver-core/component'

export const main = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')