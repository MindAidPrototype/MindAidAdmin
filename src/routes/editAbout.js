const MongoClient = require('mongodb').MongoClient
var editData = require('../dbHelpers.js').editData
require('env2')('config.env')

const blah = { 'subtitle': 'Why',
  'paragraph': 'dont know'
}

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

module.exports = (Cookie) => ({
  method: 'POST',
  path: '/about/{type}',
  handler: (request, reply) => {
    if (request.state.cookie === Cookie) {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err
        const parsedPayload = JSON.parse(request.payload)
        switch (request.params.type) {
        case 'save':
          editData(db, 'about', parsedPayload.index, parsedPayload.data, (res) => {
            reply.view('about', {about: res})
          })
          break
        default:
          reply.redirect('/about')
        }
      })
    } else {
      reply.redirect('/login')
    }
  }
})
