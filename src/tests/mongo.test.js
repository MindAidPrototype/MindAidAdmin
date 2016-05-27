'use strict'

const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
const tape = require('tape')

const url = 'mongodb://localhost:27017/mindaidtest' || process.env.MONGODB_URI

const data = {key: 'value'}

const getQuestions = (database, callback) => {
  database.collection('questions').find({}).toArray((rre, ser) => {
    if(rre) throw rre
    callback(ser)
  })
}

tape('test that data can be added to a collection', t => {
  const expected = 1
  let actual
  const collection = 'about'
  MongoClient.connect(url, (err, db) => {
    db.collection('questions').remove()
    dbHelpers.insertObjectIntoCollection(db, collection, data, (res) => {
      actual = res.insertedCount
      t.equal(expected, actual, 'data added to collection' + collection)
      t.end()
      db.close()
    })
  })
})

tape('empty a single collection', t => {
  const collection = 'about'
  MongoClient.connect(url, (err, db) => {
    dbHelpers.emptySingleCollection(db, collection, () => {
      getQuestions(db, (response) => {
        const expected = []
        const actual = response
        t.deepEqual(expected, actual, collection + 'collection emptied')
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

tape('test that data can be updated', t => {
  const oldData = {'food': 'chocolate', 'drink': 'h2o'}
  const newData = {'food': 'cake', 'drink': 'orange'}
  let actual
  MongoClient.connect(url, (err, db) => {
    db.collection('learn').insert(oldData, (error) => {
      if (error) throw error
      dbHelpers.editData(db, 'learn', oldData, newData, (res) => {
        actual = res.result.nModified
        t.ok(actual === 1, 'data updated')
        t.end()
        db.close()
      })
    })
  })
})

tape('test that data can be deleted', t => {
  let actual
  MongoClient.connect(url, (err, db) => {
    db.collection('about').insert(data, error => {
      if (error) throw error
      dbHelpers.deleteData(db, 'about', data, res => {
        actual = res.deletedCount
        t.ok(actual === 1, 'data deleted')
        t.end()
        db.close()
      })
    })
  })
})
