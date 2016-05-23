module.exports = (Cookie) => ({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      reply.view('index') :
        reply.redirect('/login')
  }
})
