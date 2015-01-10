# 05 - Input User Handler

Right now we have made a pretty solid API for getting user profiles using just plain filesystem. On the other hand we also have a greet handler that greets whatever username that is specified in the request URL. Next, it is natural to ask how can we get the user profile and greet the user's actual name instead?

Currently our user profiles are stored as plain files. Our greet handler can of course read the filesystem directly to get the profiles, but that would introduce quite a bit of extra logic. It will also require a lot of refactoring if we decide to use an actual database to store the profiles later on.

On the other hand, we already have a pretty good HTTP API for getting user profiles. So why not just use that instead? Can't we just call the user handler to get the user profiles?

Quiver designs the handler interface exactly to handle this use case. In Quiver, handler components can have dependencies on one another. Quiver [handlers](https://github.com/quiverjs/doc/wiki/Architecture-Constructs#handler) are just functions with well-defined interface. As such after initialization, they can be called internally just like regular functions.

## Handler Loader

Currently if we load the user handler from greet handler, it will be loaded as a [stream handler](https://github.com/quiverjs/doc/wiki/Architecture-Constructs#stream-handler). This will require us to manually manipulate the input and results as streams. But since we know that our user profiles are in json format, we can set a simpler loader for the user handler so that it returns json result if called internally.

```javascript
import { simpleHandlerLoader } from 'quiver-core/component'

export var userHandler = fileHandler()
  .argsFilter(...)
  .configAlias(...)
  .setLoader(simpleHandlerLoader('void', 'json'))
```

At our user handler component definition, we add one more line to call the `.setLoader()` method. Inside we create and pass in a simple handler loader that will convert the loaded handler into a function that ignores its input body (STDIN) and return result as json.

## Input Handler

```javascript
var greetHandler = simpleHandlerBuilder(
  config => {
    var { getUser, greet='Hello' } = config

    return async(function*(args) {
      var { username } = args

      var user = yield getUser({ username })
      return greet + ', ' + user.name
    })
  }, 'void', 'text')
 .inputHandler(userHandler, 'getUser')
```

The code above is how our new greet handler will be [implemented](greet.js). Let's break it down to smaller pieces and understand how it works.

```javascript
var greetHandler = simpleHandlerBuilder(...)
 .inputHandler(userHandler, 'getUser')
```

To declare dependency to the user handler, we use the [`.inputHandler()`](https://github.com/quiverjs/doc/wiki/Middleware-Components#input-handler-middleware) method to load the user handler to `config.getUser` when the greet handler is built.

The `.inputHandler()` method accepts a handler component as first argument and the config key it should load the handler to in second argument. With that simple one line, we can now access the initialized user handler from `config`.

```javascript
var greetHandler = simpleHandlerBuilder(
  config => {
    var { getUser, greet='Hello' } = config

    return async(function*(args) { ... })
  })
```

In our new greet handler implementation, we access `config.getUser` together with `config.greet`. We then wrap our greet handler in the [`async()`](https://github.com/quiverjs/doc/wiki/Promises#async) generator wrapper so that we can easily perform asynchronous call similar to the soon-to-be [async-await](https://github.com/lukehoban/ecmascript-asyncawait) standard.

```javascript
var user = yield getUser({ username })
```

Inside our handler function, we get `args.username` and forward it to the `getUser()` handler function. Because we loaded the user handler with input type `void`, the function only accepts an `args` as first argument and has no second body argument.

Recall that when exposed as HTTP API, the user handler's `args.username` is set by the router based on the URL. But when used internally, we can set `args.username` as anything before calling the user handler function.

All loaded handler functions return their results asynchronously as promises. Beause of that we use `yield` to suspend our function until the promise is resolved. Finally we should get a parsed json object assigned to the `user` variable.

```javascript
return greet + ', ' + user.name
```

Once we get the user profile json, we simply get the user's real name from `user.name` and return the string that greets the user.

## Running Server

```bash
$ npm start 05
```

Now if we run the server with our new greet handler, we should see it greets our users with their full name instead.

```bash
$ curl http://localhost:8080/greet/isaacs
Yo, Isaac Z. Schlueter

$ curl http://localhost:8080/greet/mikeal
Yo, Mikeal Rogers
```

Another benefit of using the user handler is that errors are propogated automatically. Now if we try to greet a user with no corresponding profile on the filesystem, it will fail with HTTP status 404.

```bash
$ curl -i http://localhost:8080/user/nobody
HTTP/1.1 404 Not Found

$ curl -i http://localhost:8080/greet/nobody
HTTP/1.1 404 Not Found
```

## Conclusion

The ability to call Quiver handlers internally as function call has tremendous benefit. It allows us to internally consume the same well-designed HTTP API without the overhead of HTTP requests. In practice, our handler components can add complicated middlewares such as caching, and these features will automatically be enabled without affecting how the handler function is consumed.

In our next tutorial, we will replace the mock filesystem with a real database. There you will see that despite radical changes, the greet handler can consume the user handler API the same way regardless of how the data is stored.

## Next: [06 - User Database](../06)