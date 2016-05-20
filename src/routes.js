const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('./dbHelpers.js')

const url = 'mongodb://localhost:27017/mindaiddb'
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
      reply.view('about')
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
        dbHelpers.dropCollection(db, 'questions', () => {
          dbHelpers.insertObjectIntoCollection(db, 'questions', testArrOfObjs, (res) => {
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
