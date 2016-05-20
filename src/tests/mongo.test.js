'use strict'

const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')

const url = 'mongodb://localhost:27017/mindaidtest'

const tape = require('tape')

const findAll = (db, cb2) => {
  db.collection('questions').find({}).toArray((err2, res2) => {
    if(err2) throw err2
    cb2(res2)
  })
}

tape('test that data is inserted into the db', t => {
  const data = {key: 'value'}
  const expected = 1
  let actual
  MongoClient.connect(url, (err, db) => {
    dbHelpers.dropCollection(db, 'questions', () => {
      db.collection('questions').insert({fjldsf: 'd'}, (err67, result) => {
        console.log('>>>>>>', result, '<<<<<<')
        db.collection('questions').find({}, () => {
          dbHelpers.insertObjectIntoCollection(db, 'quesitons', data, (result2) => {
            actual = result2.insertedCount
            t.equal(expected, actual)
            t.end()
            db.close()
          })
        })
      })

    })
  })
})
