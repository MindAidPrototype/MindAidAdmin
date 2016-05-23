const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('./dbHelpers.js')

const url = 'mongodb://localhost:27017/mindaidadmin'
const testArrOfObjs = [
  {
    q: 1,
    text: 'first question'
  },
  {
    q: 2,
    text: 'second question'
  }
]

const collections = ['about', 'refer']

const data = require('./data.js')

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
    path: '/screen',
    handler: (request, reply) => {
      MongoClient.connect(url, (err, db) => {
        if (err) return err
        dbHelpers.getQuestions(db, (response) => {
          const arrObjs = response
          console.log(response[4])
          reply.view('screen', {objs: arrObjs})
          db.close()
        })
      })
    }
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, reply) => {
      reply.view('about', {
        about: {
          title: 'Mind Aid',
          description: 'Description of Mind Aid'
        }
      })
    }
  },
  {
    method: 'GET',
    path: '/learn',
    handler: (request, reply) => {
      reply.view('learn')
    }
  },
  {
    method: 'GET',
    path: '/listen',
    handler: (request, reply) => {
      reply.view('listen')
    }
  },
  {
    method: 'GET',
    path: '/refer',
    handler: (request, reply) => {
      reply.view('refer')
    }
  },
  {
    method: 'GET',
    path: '/remind',
    handler: (request, reply) => {
      reply.view('remind')
    }
  },
  {
    method: 'GET',
    path: '/populatedb',
    handler: function (request, reply) {
      MongoClient.connect(url, (err, db) => {
        if (err) return err
        dbHelpers.dropCollection(db, collections, () => {
          dbHelpers.insertObjectIntoCollection(db, 'about', data.about, (resAbout) => {
            console.log(resAbout)
            dbHelpers.insertObjectIntoCollection(db, 'refer', data.refer, (resRefer) => {
              console.log(resRefer)
              reply('populated b')
              db.close()
            })
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
