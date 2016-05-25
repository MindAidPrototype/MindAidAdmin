const MongoClient = require('mongodb').MongoClient
const editData = require('../dbHelpers.js').editData
const deleteData = require('../dbHelpers.js').deleteData

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaid'

module.exports = (Cookie) => ({
  method: 'POST',
  path: '/about/{type}',
  handler: (request, reply) => {
    if (request.state.cookie === Cookie) {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err
        const index = JSON.parse(request.payload).index
        const data = JSON.parse(request.payload).data

        switch (request.params.type) {
        case 'save':
          editData(db, 'about', index, data, (res) => {
            reply.view('about', {about: res})
          })
          break
        case 'delete':
          deleteData(db, 'about', index, (res) => {
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
