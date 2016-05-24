const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/learn',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'learn', (res) => {
        console.log(res)
        reply.view('learn', {learn: res})
      })

    }) : reply.redirect('/login')
  }
})
