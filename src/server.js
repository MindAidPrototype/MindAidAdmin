const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT || 4000
const Inert = require('inert')
const Vision = require('vision')
require('env2')('./config.env')
const views = require('./views.js')

const Cookie = process.env.COOKIE
const username = process.env.USERNAME
const password = process.env.PASSWORD

server.connection({port})

server.state('cookie', {
  ttl: 60 * 1000,
  isHttpOnly: true,
  encoding: 'iron',
  password: process.env.IRONPASSWORD
})

const routes = [
  require('./routes/login.js')(Cookie),
  require('./routes/authenticate.js')(Cookie, username, password),
  require('./routes/logout.js'),
  require('./routes/index.js')(Cookie),
  require('./routes/questions.js')(Cookie),
  require('./routes/about.js')(Cookie),
  require('./routes/learn.js')(Cookie),
  require('./routes/listen.js')(Cookie),
  require('./routes/refer.js')(Cookie),
  require('./routes/remind.js')(Cookie),
  require('./routes/populatedb.js'),
  require('./routes/publicdir.js'),
]

server.register([Inert, Vision], error => {
  if (error) throw error

  server.views(views)

  server.route(routes)
})

module.exports = server
