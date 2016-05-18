const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({ port: 4000 })

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, server1!')
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
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
