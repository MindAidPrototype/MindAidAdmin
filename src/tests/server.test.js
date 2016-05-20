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
    const actual2 = res.payload.indexOf('<html>') > -1
    const expected1 = 200
    t.equal(actual1, expected1)
    t.ok(actual2)
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
    const actual2 = res.payload.substring(0, 16)
    const expected1 = 200
    const expected2 = 'populating with:'
    t.equal(actual1, expected1)
    t.equal(actual2, expected2)
    t.end()
  })
})

tape('tests if /public/js/script.js', t => {
  var options1 = {
    method: 'get',
    url: '/public/js/script.js'
  }
  server.inject(options1, res => {
    const actual1 = res.statusCode
    const expected1 = 200
    const actual2 = res.payload.indexOf('console.log') > -1
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

tape('teardown', t => {
  server.stop()
  t.end()
})

