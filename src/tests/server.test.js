const tape = require('tape')
const server = require('../server.js')
require('env2')('./config.env')
const encoded = process.env.ENCODED

const endPoints = ['index', 'questions', 'about', 'learn', 'listen', 'refer', 'remind']
const contents = [
  '<ul id="homeList"',
  'questions',
  'About Page',
  'Learn Page',
  'listen page',
  'refer page',
  'remind page'
]

const combined = endPoints.map((endpoint, i) => ({endpoint, content: contents[i]}))

const testEndPointNoCookie = endpoint => {
  tape('tests get request to ' + endpoint + ' returns with no cookie', t => {
    var options = {
      method: 'GET',
      url: endpoint === 'index' ? '/' : '/' + endpoint,
    }
    server.inject(options, res => {
      const actual1 = res.statusCode
      const expected1 = 302
      const actual2 = res.headers.location
      const expected2 = '/login'
      t.equal(actual1, expected1, 'has status code 302')
      t.equal(actual2, expected2, 'redirects to the /login endpoint')
      t.end()
    })
  })
}

const testEndPointWithCookie = (endpoint, content) => {
  tape('tests get request to ' + endpoint + ' with a cookie', t => {
    var options = {
      method: 'GET',
      url: endpoint === 'index' ? '/' : '/' + endpoint,
      headers: {
        cookie: 'cookie=' + encoded  
      }
    }
    server.inject(options, res => {
      const actual1 = res.statusCode
      const expected1 = 200
      const actual2 = res.payload.indexOf('<nav') > -1
      const actual3 = res.payload.indexOf(content)
      t.equal(actual1, expected1, 'has status code 200')
      t.ok(actual2, 'loads the default page')
      t.ok(actual3, 'loads the correct ' + endpoint + ' page')
      t.end()
    })
  })
}

endPoints.forEach(url => testEndPointNoCookie(url))

combined.forEach(el => testEndPointWithCookie(el.endpoint, el.content))

// tape('tests if /populatedb route replys with the correct text', t => {
//   var options = {
//     method: 'get',
//     url: '/populatedb'
//   }
//   server.inject(options, res => {
//     const actual1 = res.statusCode
//     const actual2 = res.payload.substring(0, 16)
//     const expected1 = 200
//     const expected2 = 'populating with:'
//     t.equal(actual1, expected1)
//     t.equal(actual2, expected2)
//     t.end()
//   })
// })

// tape('tests if /public/js/script.js', t => {
//   var options1 = {
//     method: 'get',
//     url: '/public/js/script.js'
//   }
//   server.inject(options1, res => {
//     const actual1 = res.statusCode
//     const expected1 = 200
//     const actual2 = res.payload.indexOf('console.log') > -1
//     t.equal(actual1, expected1)
//     t.ok(actual2)
//   })
//   var options2 = {
//     method: 'get',
//     url: '/public/css/main.css'
//   }
//   server.inject(options2, res => {
//     const actual1 = res.statusCode
//     const expected1 = 200
//     const actual2 = res.payload.indexOf('background') > -1
//     t.equal(actual1, expected1)
//     t.ok(actual2)
//     t.end()
//   })
// })
