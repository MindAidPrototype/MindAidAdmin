const tape = require('tape')
const server = require('../server.js')
require('env2')('./config.env')
const encoded = process.env.ENCODED

const endPoints = ['index', 'questions', 'about', 'learn', 'listen', 'refer']
const contents = [
  '<ul id="homeList"',
  'questions',
  'About Page',
  'Learn Page',
  'listen page',
  'refer page',
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

tape('tests if /populatedb route replys with the correct text', t => {
  var options = {
    method: 'get',
    url: '/populatedb'
  }
  server.inject(options, res => {
    const actual1 = res.statusCode
    const actual2 = res.payload
    const expected1 = 200
    const expected2 = 'populated b'
    t.equal(actual1, expected1)
    t.equal(actual2, expected2)
    t.end()
  })
})

tape('tests params* route to see if it findes the correct public files', t => {
  var options1 = {
    method: 'get',
    url: '/public/js/script.js'
  }
  server.inject(options1, res => {
    const actual1 = res.statusCode
    const expected1 = 200
    const actual2 = res.payload.indexOf('xhr') > -1
    t.equal(actual1, expected1)
    t.ok(actual2)
  })
  var options2 = {
    method: 'get',
    url: '/public/css/main.css'
  }
  server.inject(options2, res => {
    const actual1 = res.statusCode
    const expected1 = 200
    const actual2 = res.payload.indexOf('background') > -1
    t.equal(actual1, expected1)
    t.ok(actual2)
    t.end()
  })
})

tape('test about/{params*} endpoint', t => {
  const createOptions = (param, data) => {
    return {
      method: 'post',
      url: '/about/' + param,
      headers: {
        cookie: 'cookie=' + encoded
      },
      payload: JSON.stringify(JSON.stringify(data))
    }
  }
  const data = {
    oldData: {'colour': 'blue', 'length': 2},
    updatedData: {'colour': 'pink', 'length': 3},
    newData: {'colour': 'pink', 'length': 3}
  }

  server.inject(createOptions('save', {oldData: data.oldData, newData: data.updatedData}), res => {
    const actualStatusCode = res.statusCode
    const expectedStatusCode = 200
    const actualPayload = res.payload
    const expectedPayload = 'worked'
    t.equal(actualStatusCode, expectedStatusCode, 'correct status code')
    t.equal(actualPayload, expectedPayload, 'contains the about string')
  })

  server.inject(createOptions('delete', {oldData: data.updatedData}), res => {
    const actualStatusCode = res.statusCode
    const expectedStatusCode = 200
    const actualPayload = res.payload
    const expectedPayload = 'worked'

    t.equal(actualStatusCode, expectedStatusCode, 'correct status code')
    t.equal(actualPayload, expectedPayload, 'contains the about string')
  })

  server.inject(createOptions('savenew', {newData: data.newData}), res => {
    const actualStatusCode = res.statusCode
    const expectedStatusCode = 200
    const actualPayload = res.payload
    const expectedPayload = 'worked'

    t.equal(actualStatusCode, expectedStatusCode, 'correct status code')
    t.equal(actualPayload, expectedPayload, 'contains the about string')
    t.end()
  })
})

tape('test learn/{params*} endpoint', t => {
  const createOptions = (param, data) => {
    return {
      method: 'post',
      url: '/learn/' + param,
      headers: {
        cookie: 'cookie=' + encoded
      },
      payload: JSON.stringify(JSON.stringify(data))
    }
  }
  const data = {
    oldData: {'name': 'pumpkin', 'colour': ['orange']},
    updatedData: {'name': 'apple', 'colour': ['red','green']},
    newData: {'name': 'banana', colour: ['green']}
  }

  server.inject(createOptions('save', {oldData: data.oldData, newData: data.updatedData}), res => {
    const actualStatusCode = res.statusCode
    const expectedStatusCode = 200
    const actualPayload = res.payload
    const expectedPayload = 'worked'
    t.equal(actualStatusCode, expectedStatusCode, 'correct status code')
    t.equal(actualPayload, expectedPayload, 'reply is as expected')
  })

  server.inject(createOptions('delete', {oldData: data.oldData}), res => {
    const actualStatusCode = res.statusCode
    const expectedStatusCode = 200
    const actualPayload = res.payload
    const expectedPayload = 'worked'
    t.equal(actualStatusCode, expectedStatusCode, 'correct status code')
    t.equal(actualPayload, expectedPayload, 'reply is as expected')
  })

  server.inject(createOptions('savenew', {newData: data.newData}), res => {
    const actualStatusCode = res.statusCode
    const expectedStatusCode = 200
    const actualPayload = res.payload
    const expectedPayload = 'worked'

    t.equal(actualStatusCode, expectedStatusCode, 'correct status code')
    t.equal(actualPayload, expectedPayload, 'reply is as expected')
    t.end()
  })
})
