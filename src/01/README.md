# 01 - Hello Quiver

Welcome to the first tutorial of Quiver! In this first step we are going to create a simple HTTP server that writes "Hello Quiver" to the response.

In Quiver, everything is defined as [components](https://github.com/quiverjs/doc/wiki/Component-System) that can be composed and combined declaratively. So to create a hello world server, we just need to define a hello handler component.

## Component.js

For this example, create a [component.js](component.js) file and define our hello handler as follow:

```javascript
// component.js
import { simpleHandler } from 'quiver-core/component'

export const main = simpleHandler(
  args => 'Hello Quiver',
  'void', 'text')
```

And that's all it need! The source code above is written in [EcmaScript 6 (ES6)](http://www.2ality.com/2014/08/es6-today.html), which is the next JavaScript standard. The tutorial build script will automatically use [Traceur](https://github.com/google/traceur-compiler) to transpile the code to ES5 before running it on Node.

## Quiver Component

```javascript
import { simpleHandler } from 'quiver-core/component'
```

Now let's try to understand how the code works. In the first line of code, we import the `simpleHandler` function from the `quiver-component` package, which is later used to define a [simple handler component](https://github.com/quiverjs/doc/wiki/Handler-Components#simple-handler). The same package is aliased to `quiver-core/component` in the [`quiver-core`](https://github.com/quiverjs/doc/wiki/Core) metapackage, which includes all essential Quiver core libraries. So we will import from there instead.

## Simple Handler

The simpler handler is a simplified handler type in Quiver that accepts and return simple object types instead of [streams](https://github.com/quiverjs/doc/wiki/Architecture-Constructs#stream-handler). For simplicity now, just think of a full Quiver handler to be similar to Unix process that reads from `STDIN` and writes to `STDOUT`. The simple handler constructs automatically converts these streams to/from simple object types such as string and json.

```javascript
simpleHandler(..., 'void', 'text')
```

The `simpleHandler` function defines a handler component by taking in a function as first argument, input and output type at the second and third arguments. In this case, our simple handler ignores its input stream and thus have a `void` input type. And our simple handler returns a string, and so we define the output type as `text`. The reason we call string type `text` in Quiver is to avoid name clash with some built in JavaScript methods like `toString()`.

## Handler

```javascript
args => 'Hello Quiver'
```

Our handler function is simply a one-liner ES6 arrow function that returns the `'Hello Quiver'` string. Notice that even though the function ignores its input stream, it also accepts an `args` plain object as first argument. 

The `args` object can be used to store intermediary results by middlewares. But for this case we just ignore it and return the same string all the time.

## Run As Server

To run this demo step simply run `npm start 01` at the project home directory.

```bash
$ npm start 01
```

At a separate terminal or on your browser, navigate to http://localhost:8080 and you should see the response text "Hello Quiver".

```bash
$ curl http://localhost:8080
Hello Quiver
```

## Server

If you are curious on how to write the actual code to run the server, you can check out the [server.js](server.js) file in this directory to run this specific tutorial.

```javascript
import { startServer } from 'quiver-core/http'
import { main } from './component'

const config = { }

startServer(main, config)
.then(server => {
  console.log('Demo server running at port 8080...')
})
.catch(err => {
  console.log('error starting server:', err.stack)
})
```

After defining a component, we can easily run it as a server by using the [`startServer()`](https://github.com/quiverjs/doc/wiki/HTTP-Core) function provided in `quiver-http`.

`startServer()` also accepts a config plain object to configure the handlers, which in our case contains empty config. The function returns a promise which we then resolve to print out the status of the server.

## Next: [02 - Greet and File Handler](../02)