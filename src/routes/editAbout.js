const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/about/{type}',
  handler: (request, reply) => {
    console.log(request.params.type)
    if (request.state.cookie === Cookie) {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err
        switch (request.params.type) {
        case 'save':
          console.log(request)
          reply('save')
          break
        default:
          reply.redirect('/about')
        }
        db.close()
      })
    } else {
      reply.redirect('/login')
    }
  }
})