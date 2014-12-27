# 04 - Filter and Middleware

Now that we have slightly improved our greet handler, let's try and refactor our user handler. 

```javascript
// old user handler
var userHandler = fileHandler()
```

The user handler uses the filesystem as a simple mockup of REST API for user profiles. Everything works fine except that our flat-file database is made of files with `.json` extension. What if we want to serve the REST API as `/user/john` instead of `/user/john.json`? Do we have to rename the physical files just for it?

## Middleware

Quiver provides a simple way to extend components by composing them using the [Middleware](https://github.com/quiverjs/doc/wiki/Architecture-Constructs#middleware) and [Filter](https://github.com/quiverjs/doc/wiki/Architecture-Constructs#filter) constructs. In this tutorial we are going to create two simple middleware components to alter the behavior of the file handler.

## Args Filter

When the file handler accepts a request, it knows which file path to serve by checking `args.path`. This variable is currently set by the main router component based on the special `:restpath` route parameter.

Unlike normal route parameters, `:restpath` allow nested paths so the file handler can technically serve paths such as `/user/subdir/other.html`. But because our flat files are all in one directory, we can simplify the path resolution by telling file handler which file path to serve ourselves.

The [Args Filter](https://github.com/quiverjs/doc/wiki/Filter-Components#args-filter) component is a type of middleware component that modifies the `args` before the actual handler receives it.

```javascript
var userHandler = fileHandler()
  .argsFilter(args => {
    args.path = '/' + args.username + '.json'
  })
```

We can apply an args filter to the file handler by calling the chainable `.argsFilter()` method. Inside `argsFilter()`, we define a function that takes in `args` and compute the filepath `args.path` based on `args.username`. This way without modifying the file handler code, we can make it serve files based on `args.username` instead.

```javascript
var main = router()
  .paramRoute('/user/:username', userHandler)
```

So now with the new interface, the user route can be modified to set the user parameter to `args.username`.

## Middleware Component

The `.argsFilter()` method earlier is a syntactic sugar for creating an args filter component and applying it to the handler component. It is also possible to define the filter as separate component and then apply it later on.

```javascript
import { argsFilter } from 'quiver-core/component'

var userPathFilter = argsFilter(
args => {
  args.path = '/' + args.username + '.json'
})

var userHandler = fileHandler()
  .middleware(userPathFilter)
```

The code above shows a more verbose way to define the args filter using the `argsBuilder` constructor from `quiver-component`. The result is a `userPathFilter` middleware component that we can later on apply to the user file handler. Once we define a middleware component, we can apply it to a handler component using the chainable [`.middleware()`](https://github.com/quiverjs/doc/wiki/Base-Component#extensiblecomponentmiddleware) method. 

## Config Alias

Now that we customize how the user handler process `args`, let's also modify how the file handler is configured. Recall that file handler serve static files from the base directory specified in `config.dirPath`. If we set this in the global config and have multiple file handler instances, then all the file handlers would reference the same `dirPath` and serve the same directory.

We can allow multiple file handlers to read from different config keys to make them serve different directories. This is done by using the [config alias middleware](https://github.com/quiverjs/doc/wiki/Middleware-Components#config-alias-middleware) that alias a config key to another key. Quiver components have a convenient method `.configAlias()` to set up the alias easily.

```javascript
var userHandler = fileHandler()
  .configAlias({
    dirPath: 'userDir'
  })
```

With this, the middleware will set `config.dirPath` to the same value as `config.userDir` before the file handler is built. This way we can set `userDir` in our config, which makes it clearer for users on what that configuration is for.

Similar to args filter, the `.configAlias()` method is a syntactic sugar for creating a `configAliasMiddleware` component and applying it to the handler component:

```javascript
import { configAliasMiddleware } from 'quiver-core/component'

var userDirAlias = configAliasMiddleware({
  dirPath: 'userDir'
})

var userHandler = fileHandler()
  .middleware(userDirAlias)
```

The code above shows a more verbose way of defining config alias middleware.

## All Together

Applying both middlewares together, we get our final user handler component defined as follow:

```javascript
// user.js
var userHandler = fileHandler()
  .argsFilter(args => {
    args.path = '/' + args.username + '.json'
  })
  .configAlias({
    dirPath: 'userDir'
  })
```

Here we also separate out different components and put them in [different source files](.):

  - [user.js](user.js) - user handler component.
  - [greet.js](greet.js) - greet handler component moved with code unmodified.
  - [component.js](component.js) - main router component and hello handler.

Our [config.js](config.js) now has `userDir` set instead of `dirPath`:

```javascript
// config.js
export var config = { 
  greet: 'Yo',
  userDir: 'static/user'
}
```

## Running Server

```bash
$ npm start 04
```

Now with everything set, if we run the server we should be able to query the user API without the `.json` extension:

```bash
$ curl http://localhost:8080/user/mikeal
{
  "username": "mikeal",
  "name": "Mikeal Rogers",
  "email": "mikeal.rogers@gmail.com"
}
```

## Next: [05 - Input User Handler](../05/tutorial.md)