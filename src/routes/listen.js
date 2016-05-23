module.exports = (Cookie) => ({
  method: 'GET',
  path: '/listen',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      reply.view('listen') :
        reply.redirect('/login')
  }
})
