const dropCollections = (db, callback) => {
  db.collection('questions').drop()
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
    console.log('inserted data')
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
  dropCollections,
  insertQuestions,
  getQuestions
}
