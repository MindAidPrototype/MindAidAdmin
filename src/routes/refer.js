const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaid'

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/refer',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'refer', (res) => {
        reply.view('refer', {refer: {national: res[0], school: res[1], community: res[2], selfReferral: res[3]}})
        console.log(res[0])
        db.close()
      })
    }) : reply.redirect('/login')
  }
})
