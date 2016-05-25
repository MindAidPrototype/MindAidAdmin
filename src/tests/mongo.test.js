'use strict'

const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
const tape = require('tape')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

const data = [{key: 'value'}, {hey: 'Tasnim'}]

tape('test that data is inserted into the db', t => {
  const expected = 1
  let actual
  MongoClient.connect(url, (err, db) => {
    db.collection('questions').remove()
    dbHelpers.insertObjectIntoCollection(db, 'quesitons', {key: 'value'}, (res) => {
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
      dbHelpers.getPageData(db, 'questions', (response) => {
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
      dbHelpers.getPageData(db, 'questions', (response) => {
        const lastIndex = (response.length - 1)
        const expected = 'Tasnim'
        const actual = response[lastIndex].hey
        t.equal(expected, actual)
        t.end()
        db.close()
      })
    })
  })
})

tape('check to see if an object is removed from the collection', t => {
  MongoClient.connect(url, (err, db) => {
    db.collection('about').insert(data, () => {
      dbHelpers.deleteData(db, 'about', 1, (res) => {
        const expected = 'value'
        const actual = res[0].key
        t.equal(expected, actual)
        t.end()
        db.close()
      })
    })
  })
})
