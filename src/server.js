const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT || 4000
const Inert = require('inert')
const Vision = require('vision')
const handlebars = require('handlebars')
const Routes = require('./routes.js')

server.connection({port})

server.register([Inert, Vision], error => {
  if (error) throw error

  server.views({
    engines: {html: handlebars},
    relativeTo: __dirname + '/../',
    path: './views',
    layoutPath: './views/layout',
    layout: 'default',
    partialsPath: './views/partials/'
  })

  server.route(Routes)
})

module.exports = server
