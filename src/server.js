const Hapi = require('hapi')
const server = new Hapi.Server()
const Path = require('path')
const port = process.env.PORT || 4000
const inert = require('inert')
const vision = require('vision')
const handlebars = require('handlebars')

const plugins = [inert, vision]

server.connection({ port: port })

server.register(plugins, error => {
  if (error) throw error

  server.views({
    engines: {html: handlebars},
    relativeTo: __dirname + '/../',
    path: './views',
    layoutPath: './views/layout',
    layout: 'default',
    partialsPath: './views/partials/'
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('public/index.html')
    }
  })

  server.route({
    method: 'GET',
    path: '/sayhello',
    handler: function (request, reply) {
      reply('stuff from server 2')
    }
  })

  server.route({
    method: 'GET',
    path: '/refer',
    handler: function (request, reply) {
      reply.view('refer')
    }
  })

  // server.route({
  //   method: 'GET',
  //   path: '/public/{param*}',
  //   handler: {
  //     directory: {
  //       path: Path.join(__dirname,'/../public/')
  //     }
  //   }
  // })

  server.start((err) => {
    if (err) { throw err }
    console.log('Server running at:', server.info.uri)
  })
})
