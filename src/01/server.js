import 'quiver-core/traceur'
import { startServer } from 'quiver-core/http'
import { main } from './component'

let config = { }

startServer(main, config)
.then(server => {
  console.log('Demo server running at port 8080...')
})
.catch(err => {
  console.log('error starting server:', err.stack)
})