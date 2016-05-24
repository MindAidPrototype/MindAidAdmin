const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaidtest'

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/about',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'about', (res) => {
        reply.view('about', {about: res})
        db.close()
      })
    }) : reply.redirect('/login')
  }
})
