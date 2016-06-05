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
  MongoClient.connect(url, (err, db) => {
    db.collection('learn').deleteMany({}, () => {
      db.collection('learn').insert(oldData, (error) => {
        if (error) throw error
        dbHelpers.editData(db, 'learn', oldData, newData, () => {
          db.collection('learn').find({}).toArray((err2, res) => {
            const actual = res[0].drink
            const expected = newData.drink
            t.equal(actual, expected, 'updates old data to new data')
            t.end()
            db.close()
          })
        })
      })
    })
  })
})

tape('test that data can be deleted', t => {
  const data = {key: 'value'}
  MongoClient.connect(url, (err, db) => {
    db.collection('about').deleteMany({}, () => {
      db.collection('about').insert(data, error => {
        if (error) throw error
        dbHelpers.deleteData(db, 'about', data, () => {
          db.collection('about').find({}).toArray((err2, res2) => {
            if(err2) throw err2
            const actual = res2
            const expected = []
            t.deepEqual(actual, expected, 'about is cleared of data')
            t.end()
            db.close()
          })
        })
      })
    })
  })
})

tape('tests insertObjectIntoArray', t => {
  const data = {
    identifier: 'national',
    data: [{
      objKey1: 'objVal1'
    }]
  }
  const newObject = {
    objKey2: 'objVal2'
  }
  MongoClient.connect(url, (err, db) => {
    db.collection('refer').deleteMany({}, () => {
      db.collection('refer').insert(data, () => {
        dbHelpers.insertObjectIntoArray(db, 'refer', data.identifier, newObject, () => {
          db.collection('refer').find({}).toArray((err2, res) => {
            if(err2) throw err2
            const actual = res[0].data
            const expected = [
              {
                objKey1: 'objVal1'
              },
              {
                objKey2: 'objVal2'
              }
            ]
            t.deepEqual(actual, expected, 'inserts into an array')
            t.end()
            db.close()
          })
        })
      })
    })
  })
})

tape('tests deleteObjFromArray', t => {
  const data = {
    identifier: 'national',
    data: [
      {
        objKey1: 'objVal1'
      },
      {
        objKey2: 'objVal2'
      }
    ]
  }
  const oldObject = {
    objKey2: 'objVal2'
  }
  MongoClient.connect(url, (err, db) => {
    db.collection('refer').deleteMany({}, () => {
      db.collection('refer').insert(data, () => {
        dbHelpers.deleteObjFromArray(db, 'refer', data.identifier, oldObject, () => {
          db.collection('refer').find({}).toArray((err2, res) => {
            if(err2) throw err2
            const actual = res[0].data
            const expected = [
              {
                objKey1: 'objVal1'
              }
            ]
            t.deepEqual(actual, expected, 'deletes an object from an array')
            t.end()
            db.close()
          })
        })
      })
    })
  })
})

tape('tests editObjInArray', t => {
  const data = {
    identifier: 'national',
    data: [
      {
        objKey1: 'objVal1'
      },
      {
        objKey2: 'objVal2'
      }
    ]
  }
  MongoClient.connect(url, (err, db) => {
    if(err) throw err
    db.collection('refer').deleteMany({}, () => {
      db.collection('refer').insert(data, () => {
        const oldObject = {
          objKey2: 'objVal2'
        }
        const newObject = {
          newObjKey2: 'newObjVal2'
        }
        dbHelpers.editObjInArray(db, 'refer', data.identifier, oldObject, newObject, () => {
          db.collection('refer').find({}).toArray((err2, res) => {
            if(err2) throw err2
            const actual = res[0].data
            const expected = [
              {
                objKey1: 'objVal1'
              },
              {
                newObjKey2: 'newObjVal2'
              }
            ]
            t.deepEqual(actual, expected, 'updates object in an array')
            t.end()
            db.close()
          })
        })
      })
    })
  })
})

// tape('test updating data in an array', t => {
//   let actual
//   MongoClient.connect(url, (err, db) => {
//     db.collection('refer').deleteMany({}, () => {
//       const data = {identifier: 'national', data: [{'number': 2}]}
//       db.collection('refer').insert(data, () => {
//
//       })
//       dbHelpers.insertObjectIntoArray(db, 'refer', data.identifier, {'number': 4}, (res) => {
//         db.collection('refer').find({}).toArray((err, res) => {
//           if(err) throw err
//         })
//         actual = res.result.nModified
//         t.ok(actual===1, 'data inserted into array')
//       })
//
//       dbHelpers.deleteObjFromArray(db, 'refer', data.identifier, {'number': 4}, (res) => {
//         actual = res.result.nModified
//         t.ok(actual===1, 'data removed from array')
//       })
//
//       dbHelpers.editObjInArray(db, 'refer', data.identifier, {'number': 2}, {'number': 5}, (res) => {
//         actual = res.result.nModified
//         t.ok(actual===1, 'data updated in array')
//         t.end()
//         db.close()
//       })
//     })
//   })
// })
