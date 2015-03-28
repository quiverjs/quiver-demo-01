import { simpleHandler } from 'quiver/component'

export const main = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')