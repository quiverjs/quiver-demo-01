var pathLib = require('path')
var Datastore = require('nedb')

var dbPath = pathLib.join(__dirname, '../private/user.db')

var db = new Datastore({ filename: dbPath })
db.loadDatabase(function(err) {
  db.find({}, function(err, users) {
    if(err) throw err

    console.log('users:', users)
  })
})