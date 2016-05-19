const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT || 4000
const Inert = require('inert')
//const Routes = require('./routes')
const Vision = require('vision')
const handlebars = require('handlebars')
const Path = require('path')

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

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply.view('index')
      }
    },
    {
      method: 'GET',
      path: '/refer',
      handler: (request, reply) => {

        const arrObjs = [{q: 1, text: 'fist'}, {q: 2, text: 'second'}]
        reply.view('refer', {objs: arrObjs})
      }
    },
    {
      method: 'GET',
      path: '/public/{param*}',
      handler: {
        directory: {
          path: 'public/'
        }
      }
    },
    {
      method: 'GET',
      path: '/saveReferrals',
      handler: (request, reply) => {
        console.log('getting referrals')
        reply('saved referrals')
      }
    }
  ])
})

module.exports = server
