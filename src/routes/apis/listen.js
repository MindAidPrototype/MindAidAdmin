const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaidtest'

module.exports = {
  method: 'GET',
  path: '/listen',
  handler: (request, reply) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'listen', (res) => {
        console.log(res, '<----- listen res')
        reply.view('listen', {listen: res[0]})
      })

    })
  }
}
