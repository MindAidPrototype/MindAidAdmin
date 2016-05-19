const Hapi = require('hapi')
const server = new Hapi.Server()
const MongoClient = require('mongodb').MongoClient
const dbMethods = require('./db.js')
const url = 'mongodb://localhost:27017/mindaiddb'
const port = process.env.PORT || 4000
const Inert = require('inert')
const Vision = require('vision')
const handlebars = require('handlebars')

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
        MongoClient.connect(url, (err, db) => {
          if (err) return err
          console.log('Connected correctly to server')
          dbMethods.getReferrals(db, (response) => {
            console.log('get referrals: ', response, 'type: ', typeof response)
            const arrObjs = response
            reply.view('refer', {objs: arrObjs})
          })
        })
      }
    },
    {
      method: 'GET',
      path: '/populatedb',
      handler: function (request, reply) {
        MongoClient.connect(url, (err, db) => {
          if (err) return err
          console.log('Connected correctly to server')
          dbMethods.dropCollections(db, () => {
            dbMethods.insertReferrals(db, (res) => {
              console.log('referrals inserted')
              reply('populating with: ' + res.ops.map(el => el.text)[0] + ', ' + res.ops.map(el => el.text)[1] + '...')
            })
          })
        })
      }
    },
    {
      method: 'GET',
      path: '/getreferrals',
      handler: function (request, reply) {
        MongoClient.connect(url, (err, db) => {
          if (err) return err
          console.log('Connected correctly to server')
          dbMethods.getReferrals(db, (response) => {
            console.log('get referrals', response)
            reply(response)
          })
        })
      }
    },
    {
      method: 'GET',
      path: '/cleardb',
      handler: function (request, reply) {
        MongoClient.connect(url, (err, db) => {
          if (err) return err
          console.log('Connected correctly to server')
          dbMethods.dropCollections(db, () => {
            console.log('dropped')
            reply('drop')
          })
        })
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
