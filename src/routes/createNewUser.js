const http = require('http')

module.exports = (Cookie, newUserSecret) => ({
  method: 'post',
  path: '/createNewUser',
  handler: (request, reply) => {
    const user = JSON.parse(request.payload).user
    const pass = JSON.parse(request.payload).pass
    const payload = {
      user,
      pass,
      newUserSecret
    }
    if(request.state.cookie === Cookie) {
      const options = {
        method: 'post',
        hostname: 'mindaid.herokuapp.com',
        path: '/createNewUser'
      }
      const req = http.request(options)
      req.end(JSON.stringify(payload))

    } else {
      reply('unlucky')
    }
  }
})
