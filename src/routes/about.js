const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/about',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'about', (res) => {
        console.log(res)
        reply.view('about', {about: res})
      })
    }) : reply.redirect('/login')
  }
})
