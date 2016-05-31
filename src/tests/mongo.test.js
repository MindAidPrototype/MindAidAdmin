'use strict'

const MongoClient = require('mongodb').MongoClient
const dbHelpers = require('../dbHelpers.js')
const tape = require('tape')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindaidtest'

tape('test that data can be added to a collection', t => {
  MongoClient.connect(url, (err, db) => {
    const data = {key: 'value'}
    db.collection('about').remove(() => {
      dbHelpers.insertObjectIntoCollection(db, 'about', data, (res) => {
        const actual = res.ops[0].key
        const expected = 'value'
        t.equal(actual, expected, 'data added to collection about')
        t.end()
        db.close()
      })
    })
  })
})

tape('empty a single collection', t => {
  MongoClient.connect(url, (err, db) => {
    dbHelpers.emptySingleCollection(db, 'about', () => {
      db.collection('about').find({}).toArray((err2, res) => {
        const expected = []
        const actual = res
        t.deepEqual(actual, expected, 'about collection emptied')
        t.end()
        db.close()
      })
    })
  })
})

tape('checks if a collection has new inserted data in it', t => {
  MongoClient.connect(url, (err, db) => {
    const data = {key: 'value'}
    db.collection('questions').insert(data, (error) => {
      if(error) throw error
      db.collection('questions').find({}).toArray((err2, res) => {
        const lastIndex = (res.length - 1)
        const expected = 'value'
        const actual = res[lastIndex].key
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
    const data = {key: 'value'}
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
