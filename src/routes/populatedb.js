const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaid'

const data = require('../data.js')
const collections = Object.getOwnPropertyNames(data)

module.exports = {
  method: 'GET',
  path: '/populatedb',
  handler: function (request, reply) {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      if(collections.length) {
        dbHelpers.dropAllCollections(db, collections, (collection) => {
          dbHelpers.insertObjectIntoCollection(db, collection, data[collection], () => {
            if(collection === collections[collections.length -1]) {
              db.close()
              reply('populated b')
            }
          })
        })
      } else {
        reply('no data')
      }
    })
  }
}
