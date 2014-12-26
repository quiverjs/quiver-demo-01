import { 
  simpleHandlerBuilder
} from 'quiver-core/component'

export var greetHandler = simpleHandlerBuilder(
  config => {
    var { greet='Hello' } = config

    return args => 
      greet + ', ' + args.name
  }, 'void', 'text')