const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
require('env2')('config.env')

const url = process.env.MONGODB_URI

module.exports = {
  method: 'GET',
  path: '/questions',
  handler: (request, reply) => {
    MongoClient.connect(url, (err, db) => {
      if (err) return err
      dbHelpers.getQuestions(db, (response) => {
        const arrObjs = response
        reply.view('questions', {objs: arrObjs})
        db.close()
      })
    })
  }
}
