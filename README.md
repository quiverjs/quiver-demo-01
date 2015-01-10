Quiver Demo 01
==============

This is the first demo to demonstrate how to build simple components in [Quiver.js](http://quiverjs.org). In this demo, we are going to build a simple HTTP server that greets a user based on the URL path.

# Installation

It is easy to try out this demo by simply cloning the git repository. 

```bash
$ git clone https://github.com/quiverjs/quiver-demo-01.git
```

After cloning, go into the directory and install the required npm packages. After installation use `npm start` to start the demo server running at localhost port 8080.

```bash
$ cd quiver-demo-01
$ npm install
$ npm start
```

At a separate terminal or on your browser, navigate to http://localhost:8080 and you should see the response text "Hello Quiver".

```bash
$ curl http://localhost:8080
Hello Quiver
```

# Running Tutorial

This demo is divided into multiple tutorial steps. To make it easy to run different steps, a simple [server script](src/server.js) is used to dynamically run a server for tutorial step specified as command line argument after `npm start`. 

For example, the following command will run tutorial step 03 as HTTP server:

```bash
$ npm start 03
```

Check out the [HTTP Core](https://github.com/quiverjs/doc/wiki/HTTP-Core) documentation to find out more about running server in Quiver.

# Tutorials

  - [01 - Hello Quiver](src/01)
  - [02 - Greet and File Handler](src/02)
  - [03 - Greet Word Configuration](src/03)
  - [04 - Filter and Middleware](src/04)
  - [05 - Input User Handler](src/05)
  - [06 - User Database](src/06)
  - [07 - Database Middleware](src/07)
  - [08 - Get User Filter](src/08)