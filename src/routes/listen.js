const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData
require('env2')('config.env')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/listen',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'listen', (res) => {
        console.log(res, '<----- listen res')
        reply.view('listen', {listen: res[0]})
      })

    }) : reply.redirect('/login')
  }
})
//
// module.exports = (Cookie) => ({
//   method: 'GET',
//   path: '/listen',
//   handler: (request, reply) => {
//     request.state.cookie === Cookie ?
//       reply.view('listen') :
//         reply.redirect('/login')
//   }
// })
