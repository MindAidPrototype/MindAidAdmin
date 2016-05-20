const dropCollection = (db, collection, callback) => {
  db.collection(collection).drop()
  callback()
}

const insertQuestions = (db, callback) => {
  db.collection('questions').insertMany([
    {
      q: 1,
      text: 'first question'
    },
    {
      q: 2,
      text: 'second question'
    }
  ], (err, result) => {
    if (err) throw err
    console.log('inserted data', result)
    console.log(result)
    callback(result)
  })
}

const insertObjectIntoCollection = (db, collection, data, callback) => {
  db.collection(collection).insert(data, (err, result) => {
    if(err) throw err
    callback(result)
  })
}

// location: 'national',
// link: 'google.com',
// text: {
//   header: 'NHS',
//   phone: '0190743356',
//   address: '14 Palmers Road',
//   description: 'NHS walk in clinic for young people'
// }

const getQuestions = (db, callback) => {
  db.collection('questions').find({}).toArray((err, res) => {
    if(err) throw err
    callback(res)
  })
}

module.exports = {
  dropCollection,
  insertQuestions,
  getQuestions,
  insertObjectIntoCollection
}
