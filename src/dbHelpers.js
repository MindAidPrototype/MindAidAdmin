const dropAllCollections = (db, collections, callback) => {
  collections.forEach((collection) => {
    db.collection(collection).drop()
    callback(collection)
  })
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

const getPageData = (db, collection, callback) => {
  db.collection(collection).find({}).toArray((err, res) => {
    callback(res)
  })
}

const editData = (db, collection, index, object, callback) => {
  db.collection(collection).find({}).toArray((err, res) => {
    if (err) throw err
    res[index] = object
    db.collection(collection).remove({})
    db.collection(collection).insert(res)
    callback(res)
  })
}

module.exports = {
  dropAllCollections,
  insertObjectIntoCollection,
  emptySingleCollection,
  getPageData,
  editData
}
