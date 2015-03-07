# 07 - Database Middleware

Right now we have created a database back end for the user handler component. But the user handler is initializing the database manually and the created database instance is only accessible by itself. In practice there will be many other components that also require database access. Is there any way we can share the database instance without exposing it as global letiable?

One way to solve this is to inject the database instance into `config` so that components can access it directly. But then this will bring extra complexity to the provider of `config`, because they now have to know how to initialize the database instance. Our database instance is also initialized asynchronously, so it would require the config provider to use async control flow and handle any error arised.

## Config Middleware

In Quiver we have a better solution to this using the [middleware construct](https://github.com/quiverjs/doc/wiki/Architecture-Constructs#middleware). One of the middleware's power is the ability to modify the `config` object before the inner component's builder function receives it. In [step 04](../04#config-alias), we also created a simple config alias middleware to alias a config key to another key.

In this tutorial, we are going to create a database middleware using the [`configMiddleware()`](https://github.com/quiverjs/doc/wiki/Middleware-Components#config-middleware) component construct.

```javascript
import { configMiddleware } from 'quiver-core/component'

let databaseMiddleware = configMiddleware(
  async(function*(config) {
    if(config.db) return

    let { dbPath } = config

    let db = createDb(dbPath)
    yield db.loadDatabase()

    config.db = db
  }))
```

The `configMiddleware()` constructor takes in a function that accept a `config` object. The function can asynchronously modify the config before it is passed to a builder.

For our case, we just move the database initialization code from user handler to the database middleware. At the beginning, the middleware first check whether `config.db` is already defined. If so it means the database instance have been initialized somewhere else, and it can avoid repeating the initialization again.

The database middleware then get the database file path from `config` and initialize the database instance. Finally it stores the initialized database instance to `config.db` so that it can be used by others directly.

## Middleware Application

With the database initialization logic moved out, our user handler component becomes a bit simpler.

```javascript
let userHandler = simpleHandlerBuilder(
  config => {
    let { db } = config

    return async(function*(args) {
      let { username } = args

      let user = yield db.findOne({ username })
      if(!user) throw error(404, 'user not found')

      return user
    })
  }, 'void', 'json')
  .middleware(databaseMiddleware)
```

Now instead of initializing the database manually, use handler can directly access `config.db` and perform query on it.

To apply the database middleware to the user handler component, the [`.middleware()`](https://github.com/quiverjs/doc/wiki/Base-Component#extensiblecomponentmiddleware) method is called at the last line with the database middleware component passed in. This will automatically call the database middleware function before the user handler builder function is called.

## Putting Together

Now we have a new file [database.js](database.js) that defines the database middleware, and [user.js](user.js) imports it to apply it to the user handler component. Other than that, everything else including [config.js](config.js) remain the same. 

But greeting the user with "Yo" is so boring isn't it? Let's just change our greet word in config to "Bonjour" just for the sake of it.

```javascript
let config = { 
  greet: 'Bonjour',
  dbPath: 'private/user.db'
}
```

Taking advantage of middleware, we can simply provide the database filepath in config without having to initialize the database ourselves. Whereas the user handler component also get to make use of the database instance with the assumption that someone else have taken care of the database initialization.

## Running Server

```bash
$ npm start 07
```

Running the server should yield the same result as the previous tutorial. Except that this time our code is much simplified and reusable, and that our users are greeted with "Bonjour" instead.

```bash
$ curl http://localhost:8080/user/mikeal
{"username":"mikeal","name":"Mikeal Rogers","email":"mikeal.rogers@gmail.com","_id":"teWNHWIBWVnRbmhK"}

$ curl http://localhost:8080/greet/mikeal
Bonjour, Mikeal Rogers
```

## Next: [08 - Get User Filter](../08)