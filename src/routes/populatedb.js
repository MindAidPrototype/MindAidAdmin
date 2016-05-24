const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaidtest'

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
