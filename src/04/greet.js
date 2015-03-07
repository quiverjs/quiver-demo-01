import { 
  simpleHandlerBuilder
} from 'quiver-core/component'

export let greetHandler = simpleHandlerBuilder(
  config => {
    let { greet='Hello' } = config

    return args => 
      greet + ', ' + args.name
  }, 'void', 'text')