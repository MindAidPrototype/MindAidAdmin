const dropAllCollections = (db, collections, callback) => {
  collections.forEach((collection) => {
    db.collection(collection).drop()
  })
  callback()
}

const emptySingleCollection = (db, collection, callback) => {
  db.collection(collection).remove({})
  callback()
}

const insertObjectIntoCollection = (db, collection, data, callback) => {
  db.collection(collection).insert(data, (err, result) => {
    if(err) throw err
    callback(result)
  })
}

const getQuestions = (db, callback) => {
  db.collection('questions').find({}).toArray((err, res) => {
    if(err) throw err
    callback(res)
  })
}

module.exports = {
  dropAllCollections,
  getQuestions,
  insertObjectIntoCollection,
  emptySingleCollection,
}
