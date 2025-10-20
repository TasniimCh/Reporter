// Custom Next.js server for cPanel Node.js Application Manager
// This lets cPanel start the app with a simple startup file (server.js)
// and binds to the PORT provided by the environment.

const { createServer } = require('http')
const next = require('next')

const dev = false // Always run in production mode on cPanel
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res)
    }).listen(PORT, HOST, () => {
      console.log(`Next.js app is ready on http://${HOST}:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error starting Next.js server:', err)
    process.exit(1)
  })
