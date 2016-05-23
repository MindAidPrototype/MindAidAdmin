module.exports = (Cookie) => ({
  method: 'GET',
  path: '/refer',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      reply.view('refer') :
        reply.redirect('/login')
  }
})

