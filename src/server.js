import path from 'path'
import { startServer } from 'quiver-core/http'

let step = process.argv[2] || '01'

console.log('Running demo', step)

let subdir = path.join(__dirname, step)
let configPath = path.join(subdir, 'config')
let componentPath = path.join(subdir, 'component')

let { config } = require(configPath)
let { main } = require(componentPath)

startServer(main, config)
.then(server => {
  console.log('Demo server running at port 8080...')
})
.catch(err => {
  console.log('error starting server:', err.stack)
})