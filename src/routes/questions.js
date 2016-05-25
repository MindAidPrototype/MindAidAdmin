const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaidtest'

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/questions',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      MongoClient.connect(url, (err, db) => {
        if (err) return err
        getPageData(db, 'questions', (response) => {
          const arrObjs = response
          reply.view('questions', {objs: arrObjs})
          db.close()
        })
      }) :
        reply.redirect('/login')
  }
})
