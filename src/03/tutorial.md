# 03 - Greet Word Configuration

Now that we have a simple web server with four components running, let's start refactoring to make our application more extensible.

```javascript
// old greet handler
var greetHandler = simpleHandler(
  args => 'Hello, ' + args.name,
  'void', 'text')
```

The greet handler we have previously greets user with a hard-coded word "Hello". What if we want to allow the greet word to be configurable? Such as greeting the user with "Yo" instead?

From static file directory to database credentials, the problem of configuration management is commonly found in application development. Quiver solves this with the [Builder](https://github.com/quiverjs/doc/wiki/Architecture-Constructs#builder) construct,  which is a function that accepts a `config` plain object and returns a handler function.

So to make the greet word configurable, we simply define the component using the [`simpleHandlerBuilder()`](https://github.com/quiverjs/doc/wiki/Handler-Components#simple-handler-builder) function in `quiver-component`:

```javascript
import { simpleHandlerBuilder } from 'quiver-core/component'

// new greet handler
var greetHandler = simpleHandlerBuilder(
  config => {
    var { greet='Hello' } = config

    return args => 
      greet + ', ' + args.name

  }, 'void', 'text')
```

In the new component, we pass in a function that accepts a config. The function then extracts the greet word, with default value "Hello", out of the config using ES6 destructuring. Upon capturing the greet word, the function returns a simple handler function that later access the greet word as closure variable.

With this simple addition, our greet word can now be configured in any way. Now if we set a different greet word in [config.js](config.js), we can expect our application to use that greet word instead.

```javascript
// config.js
export var config = {
  greet: 'Yo',
  dirPath: 'static/user'
}
```

Right now the greet configuration is stored at a global location together with the `dirPath` required by the user file handler. But configuration variables in Quiver are _never_ truly global and thus is much more flexible. In later tutorials, you will learn that this is not the only way to inject configuration to components.

## Running Server

The remaining component code remain unchanged from the previous step. Full source at [component.js](component.js)

```bash
npm start 03
```

Now if we run the server we should expect the users greeted with "Yo" instead.

```bash
$ curl http://localhost:8080/greet/isaacs
Yo, isaacs
```

## Next: [04 - Filter and Middleware](../04/tutorial.md)