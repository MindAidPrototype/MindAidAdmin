const dropCollections = (db, callback) => {
  db.collection('referrals').drop((err, result) => {
    if(err) throw err
    console.log('dropping data')
    callback(result)
  })
}

const insertReferrals = (db, callback) => {
  db.collection('referrals').insertMany([{
    q: 1,
    text: 'first question'},
    {q: 2, text: 'second question'
    // location: 'national',
    // link: 'google.com',
    // text: {
    //   header: 'NHS',
    //   phone: '0190743356',
    //   address: '14 Palmers Road',
    //   description: 'NHS walk in clinic for young people'
    // }
  }], (err, result) => {
    if (err) throw err
    console.log('inserted data')
    callback(result)
  })
}

const getReferrals = (db, callback) => {
  db.collection('referrals').find({}).toArray((err, res) => {
    if(err) throw err
    callback(res)
  })
}

module.exports = {
  dropCollections,
  insertReferrals,
  getReferrals
}
