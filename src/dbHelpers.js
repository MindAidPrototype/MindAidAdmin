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

const editData = (db, collection, oldObject, newObject, callback) => {
  db.collection(collection).updateOne(oldObject, newObject, (err, res) => {
    if (err) throw err
    callback(res)
  })
}

const deleteData = (db, collection, oldObject, callback) => {
  db.collection(collection).deleteOne(oldObject, (err, res) => {
    if (err) throw err
    callback(res)
  })
}

const insertObjectIntoArray = (db, collection, identifier, newObject, callback) => {
  db.collection(collection).update({identifier}, {$push: {data: newObject}}, (err,res) => {
    if (err) throw err
    callback(res)
  })
}

const deleteObjFromArray = (db, collection, identifier, oldObject, callback) => {
  db.collection(collection).update({identifier}, {$pull: {data: oldObject}}, (err, res) => {
    if (err) throw err
    callback(res)
  })
}

module.exports = {
  dropAllCollections,
  insertObjectIntoCollection,
  emptySingleCollection,
  getPageData,
  editData,
  deleteData,
  insertObjectIntoArray,
  deleteObjFromArray
}
