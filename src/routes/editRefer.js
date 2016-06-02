const MongoClient = require('mongodb').MongoClient
const editObjInArray = require('../dbHelpers.js').editObjInArray
const deleteObjFromArray = require('../dbHelpers.js').deleteObjFromArray
const insertObjectIntoArray = require('../dbHelpers.js').insertObjectIntoArray

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaid'

module.exports = (Cookie) => ({
  method: 'POST',
  path: '/refer/{type}',
  handler: (request, reply) => {
    if (request.state.cookie === Cookie) {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err
        const identifier = JSON.parse(request.payload).identifier
        const oldData = JSON.parse(request.payload).oldData
        const newData = JSON.parse(request.payload).newData

        switch (request.params.type) {
        case 'save':
          editObjInArray(db, 'refer', identifier, oldData, newData, () => {
            db.on('close', reply('worked'))
            db.close()
          })
          break
        case 'savenew':
          insertObjectIntoArray(db, 'refer', identifier, newData, () => {
            db.on('close', reply('worked'))
            db.close()
          })
          break
        case 'delete':
          deleteObjFromArray(db, 'refer', identifier, oldData, () => {
            db.on('close', reply('worked'))
            db.close()
          })
          break
        default:
          db.on('close', reply('wrong endpoint'))
          db.close()
        }
      })
    } else {
      reply.redirect('/login')
    }
  }
})
