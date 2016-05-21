const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT || 4000
const Inert = require('inert')
const Vision = require('vision')
const views = require('./views.js')

const routes = [
  require('./routes/index.js'),
  require('./routes/questions.js'),
  require('./routes/about.js'),
  require('./routes/learn.js'),
  require('./routes/listen.js'),
  require('./routes/refer.js'),
  require('./routes/remind.js'),
  require('./routes/populatedb.js'),
  require('./routes/publicdir.js'),
]

server.connection({port})

server.register([Inert, Vision], error => {
  if (error) throw error

  server.views(views)

  server.route(routes)
})

module.exports = server
