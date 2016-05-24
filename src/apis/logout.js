const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = {
  method: 'GET',
  path: '/logoutapi',
  handler: (request, reply) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'logout', (res) => {
        reply(res)
      })
    })
  }
}
