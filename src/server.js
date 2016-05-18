const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT
const inert = require('inert')
const plugins = [inert]

server.connection({ port: port })

server.register(plugins, error => {
  if (error) throw error

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

  server.start((err) => {
    if (err) { throw err }
    console.log('Server running at:', server.info.uri)
  })
})
