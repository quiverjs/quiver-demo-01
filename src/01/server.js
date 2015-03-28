import { startServer } from 'quiver/http'
import { main } from './component'

const config = { }

startServer(main, config)
.then(server => {
  console.log('Demo server running at port 8080...')
})
.catch(err => {
  console.log('error starting server:', err.stack)
})