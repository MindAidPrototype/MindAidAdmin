const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT || 3001
const inert = require('inert')
const plugins = [inert]

const MongoClient = require('mongodb').MongoClient
var dbMethods = require('./db.js')
// Connection URL
const url = 'mongodb://localhost:27017/mindaiddb'

server.connection({ port: port })

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if (err) return err
  console.log('Connected correctly to server')
  // dbMethods.insertReferrals(db, () => {
  //   console.log('referrals inserted')
  //   dbMethods.getReferrals(db, (results) => {
  //     console.log('getting referrals: ', results)
  //     dbMethods.dropCollections(db, () => {
  //       console.log('dropped')
  //       db.close()
  //     })
  //   })
  // })
})

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

  server.route({
    method: 'GET',
    path: '/insert',
    handler: function (request, reply) {
      MongoClient.connect(url, (err, db) => {
        if (err) return err
        console.log('Connected correctly to server')
        dbMethods.insertReferrals(db, () => {
          console.log('referrals inserted')
          reply('fjdlg')
        })
      })
    }
  })

  server.route({
    method: 'GET',
    path: '/getreferrals',
    handler: function (request, reply) {
      MongoClient.connect(url, (err, db) => {
        if (err) return err
        console.log('Connected correctly to server')
        dbMethods.getReferrals(db, () => {
          console.log('get referrals')
          reply('get referrals')
        })
      })
    }
  })

  server.route({
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
  })

  server.start((err) => {
    if (err) { throw err }
    console.log('Server running at:', server.info.uri)
  })
})
