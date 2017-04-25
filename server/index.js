require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const csrf = require('csurf')
const express = require('express')
const favicon = require('serve-favicon')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path')

const apiRoutes = require('./api')

const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

let renderer
if (isProd) {
  const bundle = require('../dist/vue-ssr-bundle.json')
  const template = fs.readFileSync(resolve('../dist/index.html'), 'utf-8')
  renderer = createRenderer(bundle, template)
} else {
  require('../build/setup-dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template)
  })
}

function createRenderer (bundle, template) {
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression({ threshold: 0 }))
app.use('/dist', serve('../dist', true))
app.use('/manifest.json', serve('../manifest.json', true))
app.use('/service-worker.js', serve('../dist/service-worker.js'))

// db stuff
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)

app.use('/api', apiRoutes)

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const errorHandler = err => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err)
    }
  }
  const context = { url: req.url, cookies: req.cookies }
  const renderStream = renderer.renderToStream(context)

  renderStream
    .on('error', errorHandler)
    .on('end', () => {
      // context.state
      console.log(`whole request: ${Date.now() - s}ms`)
    })
    .pipe(res)
})

const port = process.env.PORT
const host = process.env.HOST
app.listen(port, () => {
  console.log(`🌎 listening at http://${host}:${port}`)
})
