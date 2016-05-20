const MongoClient = require('mongodb').MongoClient
// const dbMethods = require('../db.js')

const url = 'mongodb://localhost:27017/mindaiddb'

const tape = require('tape')

const insertKey = (db, cb1) => {
  db.collection('quetsions').insert({key: 'value'}, (err1, res1) => {
    if(err1) throw err1
    cb1(res1)
  })
}

const findAll = (db, cb2) => {
  db.collection('questions').find({}).toArray((err2, res2) => {
    if(err2) throw err2
    cb2(res2)
  })
}

const dropCollections = (db, cb3) => {
  db.collection('questions').drop((err3, res3) => {
    if(err3) throw err3
    cb3(res3)
  })
}

tape('dropCollections', t => {

})
