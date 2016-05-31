const MongoClient = require('mongodb').MongoClient
const editData = require('../dbHelpers.js').editData
const deleteData = require('../dbHelpers.js').deleteData
// const insertObjectIntoCollection = require('../dbHelpers.js').insertObjectIntoCollection

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaid'

module.exports = (Cookie) => ({
  method: 'POST',
  path: '/listen/{type}',
  handler: (request, reply) => {
    if (request.state.cookie === Cookie) {
      MongoClient.connect(url, (err, db) => {
        if (err) throw err
        const oldData = JSON.parse(request.payload).oldData
        const newData = JSON.parse(request.payload).newData

        switch (request.params.type) {
        case 'save':
          editData(db, 'listen', oldData, newData, () => {
            db.on('close', reply('worked'))
            db.close()
          })
          break
        case 'savenew':
          editData(db, 'listen', db.collection('listen').find({}), newData, () => {
            db.on('close', reply('worked'))
            db.close()
          })
          break
        case 'delete':
          deleteData(db, 'listen', oldData, () => {
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
