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
  if (index === 'new') {
    db.collection(collection).insert(object, (err, res) => {
      callback(res)
    })
  }
  db.collection(collection).find({}).toArray((err, res) => {
    if (err) throw err
    res[index] = object
    db.collection(collection).remove({})
    db.collection(collection).insert(res)
    callback(res)
  })
}

const deleteData = (db, collection, index, callback) => {
  db.collection(collection).find({}).toArray((err, res) => {
    if (err) throw err
    const newArr = res.filter((item, i) => {
      if (i !== index)
        return item
    })
    db.collection(collection).remove({})
    db.collection(collection).insert(newArr)
    callback(newArr)
  })
}

module.exports = {
  dropAllCollections,
  insertObjectIntoCollection,
  emptySingleCollection,
  getPageData,
  editData,
  deleteData
}
