import { 
  simpleHandlerBuilder
} from 'quiver/component'

export const greetHandler = simpleHandlerBuilder(
  config => {
    const { greet='Hello' } = config

    return args => 
      greet + ', ' + args.name
  }, 'void', 'text')