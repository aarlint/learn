import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'

const app = new Hono()

if (process.env.NODE_ENV !== 'production') {
  app.use('/api/*', cors())
}

// Serve built frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use('/*', serveStatic({ root: './dist' }))
  app.get('/*', serveStatic({ path: './dist/index.html' }))
}

const port = Number(process.env.PORT) || 3000
console.log(`Server running on :${port}`)

export default { port, fetch: app.fetch }
