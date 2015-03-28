import path from 'path'
import { startServer } from 'quiver/http'

const step = process.argv[2] || '01'

console.log('Running demo', step)

const subdir = path.join(__dirname, step)
const configPath = path.join(subdir, 'config')
const componentPath = path.join(subdir, 'component')

const { config } = require(configPath)
const { main } = require(componentPath)

startServer(main, config)
.then(server => {
  console.log('Demo server running at port 8080...')
})
.catch(err => {
  console.log('error starting server:', err.stack)
})