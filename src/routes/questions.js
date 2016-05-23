const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/questions',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      MongoClient.connect(url, (err, db) => {
        if (err) return err
        getPageData(db, 'questions', (response) => {
          const arrObjs = response
          console.log(arrObjs)
          reply.view('questions', {objs: arrObjs})
          db.close()
        })
      }) :
        reply.redirect('/login')
  }
})
