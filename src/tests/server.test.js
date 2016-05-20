const tape = require('tape')
const server = require('../server.js')

tape('tests if the server starts', t => {
  t.equal(true, true)
  t.end()
})

tape('tests if / returns status code 200', t => {
  var options = {
    method: 'GET',
    url: '/'
  }
  server.inject(options, function (res) {
    const actual = res.statusCode
    const expected = 200
    t.equal(actual, expected)
    t.end()
  })
})

tape('tests if /refer returns status code 200', t => {
  var options = {
    method: 'GET',
    url: '/refer'
  }
  server.inject(options, function (res) {
    const actual1 = res.statusCode
    const actual2 = res.payload
    const expected1 = 200
    const expected2 = '<html'
    t.equal(actual1, expected1)
    t.equal(actual2, expected2)
    t.end()
  })
})

tape('tests if /populatedb route replys with the correct text', t => {
  var options = {
    method: 'get',
    url: '/populatedb'
  }
  server.inject(options, res => {
    const actual1 = res.statusCode
    const actual2 = res.payload.substring(0, 15)
    const expected1 = 200
    const expected2 = 'populating with'
    t.equal(actual1, expected1)
    t.equal(actual2, expected2)
    t.end()
  })
})

tape('teardown', t => {
  server.stop()
  t.end()
})

