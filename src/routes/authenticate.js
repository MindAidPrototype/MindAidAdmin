module.exports = (Cookie, username, password) => ({
  method: 'post',
  path: '/authenticate',
  config: {
    handler: (request, reply) => {
      const user = {
        username,
        password 
      }
      const parsedRequest = JSON.parse(request.payload)
      parsedRequest.username === user.username && parsedRequest.password === user.password ?
        reply(1).state('cookie', Cookie) :
          reply(0)
    }
  }
})
