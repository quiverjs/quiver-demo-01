# 02 - Greet and File Handler

Now that we have learned how to define a simple hello world component, let's define a couple more simple components and group them together. See the full source code [here](component.js).

## Hello Handler

```javascript
const helloHandler = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')
```

The first component is the same hello handler that we defined earlier, except that it is assigned to the `helloHandler` letiable.

## Greet Handler

```javascript
const greetHandler = simpleHandler(
  args => 'Hello, ' + args.name,
  'void', 'text')
```

The second component is a slightly more complicated component that greets a user's name with "Hello". The name is retrieved from `args`, which is set by some upstream middleware. Our greet handler also ignores the input stream and returns a string containing the greeting.

## File Handler

```javascript
import { fileHandler } from 'quiver-file-component'

const userHandler = fileHandler()
```

For the third component, we define a simple file handler using the `fileHandler()` function in [`quiver-file-component`](https://github.com/quiverjs/quiver-file-component) package. This file handler will be used to serve the [static directory](../../static/user) containing json files with user information.

The static file handler is used to simulate user database on the filesystem. For this demo, we have a few mock users in the [user directory](../../static/user) that looks like the [following](../../static/user/isaacs.json):

```json
{
  "username": "isaacs",
  "name": "Isaac Z. Schlueter",
  "email": "i@izs.me"
}
```

## Router Handler

Now that we have three components defined, we need to create a router to dispatch HTTP requests to different components based on the URL. This can be done using the [router component](https://github.com/quiverjs/doc/wiki/Router-Component).

```javascript
import { router } from 'quiver-core/component'

export const main = router()
  .staticRoute('/', helloHandler)
  .paramRoute('/greet/:name', greetHandler)
  .paramRoute('/user/:restpath', userHandler)
```

The router component allow us to mount other handler components in different subpaths. In this example, we mount the `helloHandler` on the static root path `/`. As for greet and user handler, we use the parameterized route type to mount the handlers at dynamic path.

```javascript
router.paramRoute('/greet/:name', greetHandler)
```

For `greetHandler`, we use `:name` to bind the value after the `/greet/` base URL to `args.name`. With that, a HTTP request with an example URL `/greet/john` will be routed by the router to `greetHandler` with `args.name` set to `"john"`.

```javascript
router.paramRoute('/user/:restpath', userHandler)
```

For the user file handler, we use the special `:restpath` parameter to set the new path to the remaining subpath. This allows the file handler to serve nested folders based on the given path.

### Config

With all components defined, we can now run the main router component as the entry point of the server. But before that we need to specify some configuration for the file handler.

```javascript
// config.js
export const config = { 
  dirPath: 'static/user'
}
```

The file handler needs to know which directory it should serve files from. This is where the config object comes into picture. In our case, we need to point `config.dirPath` to the static user directory.

The tutorial server script will automatically load the config from [config.js](config.js) in the step directory.

## Running Server

For this tutorial step, run `npm start 02` at the project home directory to start the server.

```bash
$ npm start 02
```

We can then use curl to test the different URLs.

```bash
$ curl http://localhost:8080
Hello Quiver

$ curl http://localhost:8080/greet/john
Hello, john

$ curl http://localhost:8080/greet/isaacs
Hello, isaacs

$ curl http://localhost:8080/user/john.json
{
  "username": "john",
  "name": "John Smith",
  "email": "johnsmith@example.org"
}

$ curl http://localhost:8080/user/isaacs.json
{
  "username": "isaacs",
  "name": "Isaac Z. Schlueter",
  "email": "i@izs.me"
}
```

## Next: [03 - Greet Word Configuration](../03)