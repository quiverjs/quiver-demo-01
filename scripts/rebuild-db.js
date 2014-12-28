var fs = require('fs')
var pathLib = require('path')
var Datastore = require('nedb')

var dbPath = pathLib.join(__dirname, '../private/user.db')
var userDir = pathLib.join(__dirname, '../static/user')

var users = fs.readdirSync(userDir)
  .map(function(path) {
    var filePath = pathLib.join(userDir, path)
    return require(filePath)
  })

if(fs.existsSync(dbPath))
  fs.unlinkSync(dbPath)

var db = new Datastore({ filename: dbPath })
db.loadDatabase(function(err) {
  db.insert(users)
})