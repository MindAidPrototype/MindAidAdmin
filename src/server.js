const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT || 4000
const Inert = require('inert')
const Routes = require('./routes')

server.connection({port})

server.register([Inert], error => {
  if (error) throw error

  server.route(Routes)
})

module.exports = server
