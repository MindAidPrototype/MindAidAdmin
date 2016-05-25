const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaidtest'

module.exports = {
  method: 'GET',
  path: '/listenapi',
  handler: (request, reply) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'listen', (res) => {
        reply(res)
      })
    })
  }
}
