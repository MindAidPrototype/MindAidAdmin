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

const collections = ['about', 'refer']

const data = require('../data.js')

module.exports = {
  method: 'GET',
  path: '/populatedb',
  handler: function (request, reply) {
    MongoClient.connect(url, (err, db) => {
      if (err) return err
      dbHelpers.dropAllCollections(db, collections, () => {
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
}
