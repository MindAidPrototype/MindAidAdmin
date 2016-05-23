const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

const collections = ['about', 'refer']

const data = require('../data.js')

module.exports = {
  method: 'GET',
  path: '/populatedb',
  handler: function (request, reply) {
    MongoClient.connect(url, (err, db) => {
      if (err) return err
      dbHelpers.dropAllCollections(db, collections, (collection) => {
        dbHelpers.insertObjectIntoCollection(db, collection, data[collection], () => {
          reply('populated b')
        })
      })
    })
  }
}
