const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/questions',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      MongoClient.connect(url, (err, db) => {
        if (err) return err
        dbHelpers.getQuestions(db, (response) => {
          const arrObjs = response
          reply.view('questions', {objs: arrObjs})
          db.close()
        })
      }) :
        reply.redirect('/login')
  }
})
