import 'traceur'

import path from 'path'
import { startServer } from 'quiver-http'

var step = process.argv[2] || '01'

console.log('Running demo', step)

var subdir = path.join(__dirname, step)
var configPath = path.join(subdir, 'config.js')
var componentPath = path.join(subdir, 'component.js')

var { config } = require(configPath)
var { main } = require(componentPath)

startServer(main, config)
.then(server => {
  console.log('Multipart form server running at port 8080...')
})
.catch(err => {
  console.log('error starting server:', err.stack)
})