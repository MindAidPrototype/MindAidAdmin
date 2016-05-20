const MongoClient = require('mongodb').MongoClient
const dbMethods = require('./dbHelpers.js')

const url = 'mongodb://localhost:27017/mindaiddb'

module.exports = (
[
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index')
    }
  },
  {
    method: 'GET',
    path: '/questions',
    handler: (request, reply) => {
      MongoClient.connect(url, (err, db) => {
        if (err) return err
        dbMethods.getQuestions(db, (response) => {
          const arrObjs = response
          reply.view('questions', {objs: arrObjs})
          db.close()
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
        dbMethods.dropCollections(db, () => {
          dbMethods.insertQuestions(db, (res) => {
            reply('populating with: ' + res.ops.map(el => el.text)[0] + ', ' + res.ops.map(el => el.text)[1] + '...')
            db.close()
          })
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
      reply('saved referrals')
    }
  }
])
