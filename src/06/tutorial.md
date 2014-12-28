# 06 - User Database

Right now our user profiles are stored as flat files. This is useful for rapid prototyping but in practice we would want to store it in some proper database to run in production. In this tutorial we are going to reimplement the user handler to query user profiles from database.

For simplicity in this demo, we are going to use the [Node Embedded Database (NeDB)](https://github.com/louischatriot/nedb) to store our user profiles. NeDB is a [MongoDB-like](http://www.mongodb.org/) NoSQL database that stores its data in plain files. This means that you don't need to install any extra software because NeDB is written in JavaScript!

## Promisification

NeDB currently has callback-based API, but Quiver uses promises to manage asynchronous control flow. To make the code simpler, we use the [`promisifyMethods()`](https://github.com/quiverjs/doc/wiki/Promises#promisifymethods) utility from [`quiver-promise`](https://github.com/quiverjs/quiver-promise) to promisify some NeDB APIs so that we can use it more easily.

```javascript
import { promisifyMethods } from 'quiver-core/promise'

var createDb = dbPath => {
  var db = new Datastore({ filename: dbPath })

  return promisifyMethods(db, 
    ['loadDatabase', 'find', 'findOne'])
}
```

Above we have a naive `createDb()` function that creates a promisified NeDB database instance based on the db file path. Because we only use three database methods in this example, we only promisify the three methods for simplicity.

## Database Scripts

For this demo, our database blob is stored at [private/user.db](../../private/user.db). There are also two scripts available at the [scripts](../../scripts) folder to make it easy to import and inspect the database. 

  - [rebuild-db.js](../../scripts/rebuild-db.js) will override the existing database file and import user data from the json files at [static/user](../../static/user).
  - [show-db.js](../../scripts/show-db.js) simply loads the database and print out all database entries to the console.

The database scripts can also be run as npm scripts from the home directory.

```bash
$ npm run rebuild-db

$ npm run show-db
users: [
  {
    "username": "mikeal",
    "name": "Mikeal Rogers",
    "email": "mikeal.rogers@gmail.com",
    "_id": "XPHetXF7I99bmJyK"
  },
  ...
]
```
Note that the printed internal `_id` field may have different value every time the database is rebuilt.

## User Handler

Now that we have our database setup, let's re-implement our [user handler](user.js).

```javascript
import { error } from 'quiver-core/error'
import { simpleHandlerBuilder } from 'quiver-core/component'

var userHandler = simpleHandlerBuilder(
  async(function*(config) {
    var { dbPath } = config
    
    var db = createDb(dbPath)
    yield db.loadDatabase()

    return async(function*(args) {
      var { username } = args

      var user = yield db.findOne({ username })
      if(!user) throw error(404, 'user not found')

      return user
    })
  }), 'void', 'json')
```

Here we define the new user handler as a [simple handler builder](https://github.com/quiverjs/doc/wiki/Handler-Components#simple-handler-builder) component with its handler function ignores input stream and return result as json.

Beause there are asynchronous code involved, we wrap both the builder and handler functions with the `quiver-promise` [`async()`](https://github.com/quiverjs/doc/wiki/Promises#async) wrapper to make the code simpler.

```javascript
var userHandler = simpleHandlerBuilder(
  async(function*(config) {
    var { dbPath } = config
    
    var db = createDb(dbPath)
    yield db.loadDatabase()

    return async(function*(args) { ... })
  }), ...)
```

First of all let's focus on the builder function. Our user handler now expects a database path specified in `config` that tells it where to load the database file.

We then use the `createDb()` function we defined earlier to create a new NeDB instance. NeDB requires created database to be [loaded](https://github.com/louischatriot/nedb#creatingloading-a-database), so we call the promisified `db.loadDatabase()` and use `yield` to wait for the promise to resolve.

```javascript
async(function*(args) {
  var { username } = args

  var user = yield db.findOne({ username })
  if(!user) throw error(404, 'user not found')

  return user
})
```

In our handler function, we extract `args.username` and use [`db.findOne()`](https://github.com/louischatriot/nedb/wiki/Finding-documents) to search for the user entry. If we found it we just return the result as json.

Because NeDB returns `null` if there is no entry found, in such case we throw an error with error code 404 using the `error()` helper provided by [`quiver-error`](https://github.com/quiverjs/doc/wiki/Errors). In Quiver if error is thrown with a `.errorCode` attribute, it will be used as the HTTP status code in the response.

## Running Server

Last thing we need to update before running is to set the database path in [config.js](config.js)

```javascript
// config.js
export var config = { 
  greet: 'Yo',
  dbPath: 'private/user.db'
}
```

After this we can just run the new server straight away with no further modification.

```bash
$ npm start 06
```

```bash
$ curl http://localhost:8080/user/isaacs
{"username":"isaacs","name":"Isaac Z. Schlueter","email":"i@izs.me","_id":"gPMXTWL0r82ZRn28"}

$ curl http://localhost:8080/greet/isaacs
Yo, Isaac Z. Schlueter

$ curl -i http://localhost:8080/user/nobody
HTTP/1.1 404 Not Found

$ curl -i http://localhost:8080/greet/nobody
HTTP/1.1 404 Not Found
```

The result of our API remain the same, except with an addition `_id` field inserted by NeDB in the user API.

## Conclusion

Notice that despite radical changes to the user handler, our [greet handler](greet.js) remain completely unchanged! By having general handler interfaces, the implementation of handlers are encapsulated. This allow loose coupling between components regardless of how the actual resources are fetched.

## Next: [07 - Database Middleware](../07/tutorial.md)