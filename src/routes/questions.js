const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')

const url = process.env.MONGODB_URI
// const testArrOfObjs = [
//   {
//     q: 1,
//     text: 'first question'
//   },
//   {
//     q: 2,
//     text: 'second question'
//   }
// ]

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
