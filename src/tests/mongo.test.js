'use strict'

const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
require('env2')('config.env')

const url = process.env.PROD_MONGODB
const data = {key: 'value'}

const getQuestions = (database, callback) => {
  database.collection('questions').find({}).toArray((rre, ser) => {
    if(rre) throw rre
    callback(ser)
  })
}

const tape = require('tape')

tape('test that data is inserted into the db', t => {
  const expected = 1
  let actual
  MongoClient.connect(url, (err, db) => {
    db.collection('questions').remove()
    dbHelpers.insertObjectIntoCollection(db, 'quesitons', data, (res) => {
      actual = res.insertedCount
      t.equal(expected, actual)
      t.end()
      db.close()
    })
  })
})

tape('empty a single collection', t => {
  MongoClient.connect(url, (err, db) => {
    dbHelpers.emptySingleCollection(db, 'questions', () => {
      getQuestions(db, (response) => {
        const expected = []
        const actual = response
        t.deepEqual(expected, actual)
        t.end()
        db.close()
      })
    })
  })
})

tape('checks if a collection has new inserted data in it', t => {
  MongoClient.connect(url, (err, db) => {
    db.collection('questions').insert(data, (error) => {
      if(error) throw error
      getQuestions(db, (response) => {
        const lastIndex = (response.length - 1)
        const expected = 'value'
        const actual = response[lastIndex].key
        t.equal(expected, actual)
        t.end()
        db.close()
      })
    })
  })
})
