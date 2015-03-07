# 08 - Get User Filter

Calling the user handler from greet handler frees us from the concern of how to retrieve user profile information. While the coupling is loose, the greet handler still have to maintain connection with the user handler and know how to call the user handler API. In practice there will be many other components that might need access to user profile information. Do they all have to know how to query that from the user handler?

From the greet handler perspective, it really don't need to understand how to retrieve user profiles at all. All the greet handler should care is that there is a user it needs to greet with their real name. So why not just pass the user profile into `args` for it to access directly?

## Args Filter

Quiver provides a clean and easy way to separate concerns using the [filter construct](https://github.com/quiverjs/doc/wiki/Architecture-Constructs#filter). A filter is a subset of middleware that can modify the input and output of a handler. It can for example inject intermediary results into `args`, or perform transformation on the input stream before the handler receives it. A filter can also modify the result returned by a handler or recover from any error raised by the handler.

In this tutorial we are going to use the [`argsBuilderFilter()`](https://github.com/quiverjs/doc/wiki/Filter-Components#args-builder-filter) construct to create a [get user filter](user.js) that automatically fetch a user profile and put it into `args`.

```javascript
import { argsBuilderFilter } from 'quiver-core/component'

let getUserFilter = argsBuilderFilter(
  config => {
    let { getUser } = config

    return async(function*(args) {
      if(args.user) return

      let { username } = args
      args.user = yield getUser({ username })
    })
  })
 .inputHandler(userHandler, 'getUser')
```

The `argsBuilderFilter()` construct takes in a builder function that builds an args handler function that accepts an `args` object. The result is a middleware component that can later be applied to handler components.

```javascript
let getUserFilter = argsBuilderFilter(
  config => {
    let { getUser } = config

    return async(function*(args) { ... })
  })
 .inputHandler(userHandler, 'getUser')
```

Middleware components themselves can also depend on other middleware or handler components. In this case our `getUserFilter` component declares dependency on the `userHandler` component with the `.inputHandler()` method. With that it can access the user handler function from `config.getUser`.

```javascript
async(function*(args) {
  if(args.user) return

  let { username } = args
  args.user = yield getUser({ username })
})
```

We then create the args filter function, which is called with an `args` before the downstream handler function receives it. Inside we can asynchronously modify `args`. 

The filter function first checks whether `args.user` exists. If so it means that the user profile have been injected somewhere else and it can skip querying for the profile. It then gets the requested username from `args.username` and then call `getUser()` to retrieve the profile. Finally it sets the user profile into `args.user` for any downstream handler to access.

## New Greet Handler

With `getUserFilter` component, our [greet handler](greet.js) component can be completely stripped of logic of user profile retrieval.

```javascript
let greetHandler = simpleHandlerBuilder(
  config => {
    let { greet='Hello' } = config

    return args =>
      greet + ', ' + args.user.name
      
  }, 'void', 'text')
  .middleware(getUserFilter)
```

At the last line of code, the `getUserFilter` component is applied to the greet handler with `.middleware()`. With that, our greet handler code have been reduced to almost the same as the one we have earlier in [tutorial 04](../04/greet.js)! The only difference is that the name of the user is now accessed from `args.user.name` instead of `args.username`.

So with just one additional line at the end, our greet handler has almost unchanged core logic but is then packed with pretty complicated logic of retrieving user profile behind the scene.

## Running Server

```bash
$ npm start 08
```

Now let's try running the server again. It should greet the users same as before, but now we have let the `getUserFilter` do all the heavylifting.

```bash
$ curl http://localhost:8080/user/substack
{"username":"substack","name":"James Halliday","email":"substack@gmail.com","_id":"k06BHk28NguWWD6v"}

$ curl http://localhost:8080/greet/substack
Bonjour, James Halliday
```

## Conclusion

In this final tutorial, we have managed to break down a very simple application into six modular components:

  - [Hello Handler](component.js) for just printing "Hello Quiver"
  - [Database Middleware](database.js) for injecting database instance to `config`
  - [User Handler](user.js) for retrieving user profiles from database
  - [Get User Filter](user.js) for fetching and injecting user profiles into `args`
  - [Greet Handler](greet.js) for greeting users' real names with a configurable greet word
  - [Main Router](component.js) for linking Hello Handler, User Handler, and Greet Handler together and perform URL routing

Many of these components, including the user handler and database middleware, can be easily reused across many components as the application grows bigger. The design of Quiver also makes it trivial to perform significant changes or even completely replace a component, while the other components that depend on it can remain unchanged as long as the API remain the same.

We hope that by now this tutorial have give you a sense on how code is written in Quiver, and the benefits of modularity provided by Quiver. There are many more advanced topics that we do not cover in this tutorial, such as stream manipulation and the full filter/middleware constructs.

To learn more, do visit the [project website](http://quiverjs.org) and start coding using Quiver!