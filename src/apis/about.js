const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaid'

module.exports = {
  method: 'GET',
  path: '/aboutapi',
  handler: (request, reply) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'about', (res) => {
        reply(res)
      })
    })
  }
}
