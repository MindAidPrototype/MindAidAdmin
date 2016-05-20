'use strict'

const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')

const url = 'mongodb://localhost:27017/mindaidtest'

const tape = require('tape')

tape('test that data is inserted into the db', t => {
  const data = {key: 'value'}
  const expected = 1
  let actual
  MongoClient.connect(url, (err, db) => {
    db.collection('questions').remove()
    dbHelpers.insertObjectIntoCollection(db, 'quesitons', data, (result2) => {
      actual = result2.insertedCount
      t.equal(expected, actual)
      t.end()
      db.close()
    })
  })
})
