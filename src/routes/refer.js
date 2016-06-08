const MongoClient = require('mongodb').MongoClient
const getPageData = require('../dbHelpers.js').getPageData

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaid'

module.exports = (Cookie) => ({
  method: 'GET',
  path: '/refer',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
    MongoClient.connect(url, (err, db) => {
      if (err) throw err
      getPageData(db, 'refer', (res) => {
        const obj = {}
        res.forEach((el => {
          switch (el.identifier) {
          case 'national': obj.national = el
            break
          case 'school': obj.school = el
            break
          case 'community': obj.community = el
            break
          case 'selfReferral': obj.selfReferral = el
            break
          }
        }))
        reply.view('refer', {refer: obj})
        db.close()
      })
    }) : reply.redirect('/login')
  }
})
