const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

const data = require('../data.js')
const collections = Object.getOwnPropertyNames(data)
console.log(collections)

module.exports = {
  method: 'GET',
  path: '/populatedb',
  handler: function (request, reply) {
    MongoClient.connect(url, (err, db) => {
      if (err) return err
      dbHelpers.dropAllCollections(db, collections, (collection) => {
        dbHelpers.insertObjectIntoCollection(db, collection, data[collection], () => {

        })

      })
    })
    reply('populated b')
  }
}
