const MongoClient = require('mongodb').MongoClient
const getPageData = require('../../dbHelpers.js').getPageData
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = {
  method: 'GET',
  path: '/aboutapi',
  handler: (request, reply) => {
    console.log('aboutingadmin')
    console.log(request)
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'about', (res) => {
        reply.view('about', {about: res})
      })
    })
  }
}
