const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

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

module.exports = {
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
}
